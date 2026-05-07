import { connect } from '@tidbcloud/serverless';

export async function onRequestPost(context: any) {
  const connection = connect({ url: context.env.DATABASE_URL });
  const userId = 'user_1';

  try {
    const body: any = await context.request.json();
    const { splitId, exerciseName, sets, date } = body;
    
    // sets is an array like: [{ id: 1, weight: '60', reps: '10', time: '10:35' }, ...]
    // We insert each valid set into workout_logs
    if (sets && sets.length > 0) {
      for (const set of sets) {
        // We only insert valid sets (with weight and reps)
        if (set.weight && set.reps) {
          await connection.execute(
            'INSERT INTO workout_logs (user_id, split_id, exercise_name, set_number, weight, reps, logged_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, splitId, exerciseName, set.id, parseFloat(set.weight), parseInt(set.reps), set.time || '']
          );
        }
      }
    }

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
