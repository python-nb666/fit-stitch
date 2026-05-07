import { connect } from '@tidbcloud/serverless';

export async function onRequestPut(context: any) {
  const connection = connect({ url: context.env.DATABASE_URL });
  const splitId = context.params.id;
  
  try {
    const body: any = await context.request.json();
    const { active, pool } = body;
    
    // Clear old exercises
    await connection.execute('DELETE FROM split_exercises WHERE split_id = ?', [splitId]);
    
    // Insert new active
    if (active && active.length > 0) {
      for (let i = 0; i < active.length; i++) {
        await connection.execute(
          'INSERT INTO split_exercises (split_id, exercise_name, status, sort_order) VALUES (?, ?, ?, ?)',
          [splitId, active[i], 'active', i]
        );
      }
    }
    
    // Insert new pool
    if (pool && pool.length > 0) {
      for (let i = 0; i < pool.length; i++) {
        await connection.execute(
          'INSERT INTO split_exercises (split_id, exercise_name, status, sort_order) VALUES (?, ?, ?, ?)',
          [splitId, pool[i], 'pool', i]
        );
      }
    }

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
