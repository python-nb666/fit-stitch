import { connect } from '@tidbcloud/serverless';

export async function onRequestGet(context: any) {
  const connection = connect({ url: context.env.DATABASE_URL });
  const userId = 'user_1';

  try {
    const result: any = await connection.execute(
      'SELECT DISTINCT DATE(created_at) as date FROM workout_logs WHERE user_id = ?',
      [userId]
    );
    
    // In @tidbcloud/serverless, result.rows contains the array of row objects
    const rows = result.rows || result || [];
    
    // Extract just the date string part (format: YYYY-MM-DD)
    const trainedDays = rows.map((r: any) => {
      // TiDB returns DATE as a string or Date object depending on the driver config
      const d = new Date(r.date);
      return d.toLocaleDateString('en-CA'); // 'YYYY-MM-DD'
    });

    return Response.json({ trainedDays });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
