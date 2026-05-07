export const defaultSplits = [
  {
    id: 'chest',
    name: 'Chest Day',
    type: 'STRENGTH',
    duration: '65 MIN',
    exercises: ['杠铃卧推', '哑铃卧推', '上斜哑铃卧推', '蝴蝶机夹胸', '固定器械坐姿推胸', '绳索下压'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJKifnBTrYnwsgF5T11IKnfqG_9RIg4IXUacTFELEa-gCXk2LTl2YrWjkuJ7B-TZt4PDQ5NYEvUqdEss0pBr2PznTDPa0FVegYOr3IVW66YhYbGVqS2cZrZhvq6Ctto49_qTw74JeEHO2W8PwyKj_ZHp1dFoHNpGQ9qFTIw3zrYZDxtfwQaNocLEtzfxuLvQnIVuwMmXnKk1UZaN92CBUqFiB8uhk14iLjdQiYwYfkpxixDhE_cmZ1jpLx_qRIHxSWzl52BivdsPo'
  },
  {
    id: 'back',
    name: 'Back Day',
    type: 'HYPERTROPHY',
    duration: '75 MIN',
    exercises: ['硬拉', '高位下拉', '哑铃划船'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNK5_2Pmcw7ITaHj_KQ7aESGwrj4UqMamCk_IqWKiMdaa7ajCZauCsgE5ZrcyX2PDP0LSh-gM4a2MBamsDPFduZui0KLmVENrphsLeV4MOyt4Pd-xzSAot7KR9cDf675DryWbnWi0lIA4RPQzKM2SYv1vR97LsBVx7gOQR37Xaz2mf7gBarg6tYsvGZQSrpf-iw8ognZgFHhN9E3l-GdsZIlguwCWKbc7-P-0ZBr5k-KVVYamKuWbBbujAIkuhnasRWbZsyhwgqIA'
  },
  {
    id: 'legs',
    name: 'Leg Day',
    type: 'INTENSITY',
    duration: '90 MIN',
    exercises: ['杠铃深蹲', '腿举', '腿弯举', '提踵'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT_ZHsi7uMy-l9M6Aut4PMsQU5qddgjV7Q1Bya8gfLD0SWljjxup9HeFvu7w7r1a_xlYnmPKncCPaGE_KD_MzUlmtTEdG2HW953JkPpyGgu2nVxrtLHpUztWkhTt5fcGpXCg4741i0KIramNqKAV0GFg8bOThPsFLxzbAS-ePNpLe3Mk-1oXOmDDXk72MzmjFP-Xt8W73eVOhZahj_T_6wWxU2Mj-oD8ofKIUrfH49E92W3BEM9kDXH1RYJY_HEqaSSY6GuGQv9b4',
    fullWidth: true
  }
];

export const getSplits = () => {
  const saved = localStorage.getItem('mySplits');
  if (saved) {
    let parsed = JSON.parse(saved);
    let modified = false;
    parsed = parsed.map((s: any) => {
      if (s.exercises && s.exercises.includes('平板卧推')) {
        modified = true;
        s.exercises = s.exercises.map((e: string) => e === '平板卧推' ? '杠铃卧推' : e);
      }
      if (s.pool && s.pool.includes('平板卧推')) {
        modified = true;
        s.pool = s.pool.map((e: string) => e === '平板卧推' ? '杠铃卧推' : e);
      }
      return s;
    });
    if (modified) {
      localStorage.setItem('mySplits', JSON.stringify(parsed));
    }
    return parsed;
  }
  localStorage.setItem('mySplits', JSON.stringify(defaultSplits));
  return defaultSplits;
};

export const saveSplits = (splits: any) => {
  localStorage.setItem('mySplits', JSON.stringify(splits));
};
