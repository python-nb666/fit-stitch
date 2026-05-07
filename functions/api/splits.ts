import { connect } from '@tidbcloud/serverless';

export async function onRequestGet(context: any) {
  const connection = connect({ url: context.env.DATABASE_URL });
  const userId = 'user_1';

  try {
    const splitsResult: any = await connection.execute('SELECT * FROM splits WHERE user_id = ?', [userId]);
    const splits = splitsResult.rows || splitsResult || [];

    const exercisesResult: any = await connection.execute(
      'SELECT split_id, exercise_name, status FROM split_exercises WHERE split_id IN (SELECT id FROM splits WHERE user_id = ?) ORDER BY sort_order ASC',
      [userId]
    );
    const exercises = exercisesResult.rows || exercisesResult || [];

    // Group exercises by split_id
    const splitMap: Record<string, any> = {};
    splits.forEach((s: any) => {
      splitMap[s.id] = {
        ...s,
        exercises: [],
        pool: []
      };
    });

    exercises.forEach((ex: any) => {
      if (splitMap[ex.split_id]) {
        if (ex.status === 'active') {
          splitMap[ex.split_id].exercises.push(ex.exercise_name);
        } else {
          splitMap[ex.split_id].pool.push(ex.exercise_name);
        }
      }
    });

    // The frontend currently expects an array in order. We can just sort by id for now or preserve initial order.
    // Let's return the object values.
    const result = Object.values(splitMap);

    return Response.json(result);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
