# scraping-baseball-data
Pacific League batter only

## Project setup
```
yarn install
```

### Compiles and minifies for production
```
yarn run webpack
```

### Name of key to be responded
```
BATTER

  'RANK', // 順位
  'NAME', // 名前
  'TEAM', // 所属チーム
  'AVG', // BATTING AVERAGE 打率
  'GAMES', // GAMES PLAYED 試合数
  'PA', // PLATE APPEARANCES 打席数
  'AB', // AT BATS 打数
  'H', // HITS 安打数
  '2B', // 二塁打数
  '3B', // 三塁打数
  'HR', // 本塁打数
  'TB', // TOTAL BASES 塁打数
  'RBI', // RUNS BATTED IN 打点数
  'RS', // RUN SCORED 得点数
  'SO', // STRIKEOUTS 三振数
  'BB', // BASES ON BALLS 四球数
  'HBP', // HIT BY PITCH 死球
  'SH', // SACRIFICE HITS 犠打数
  'SF', // SACRIFICE FLIES 犠飛数
  'SB', // STOLEN BASES 盗塁数
  'CS', // CAUGHT STEALLING 盗塁死数
  'GDP', // GROUND INTO DOUBLE PLAYS 併殺打数
  'OBP', // ON BASE PERCENTAGE 出塁率
  'SLG', // SLUGGING PERCENTAGE 長打率
  'OPS', // ON BASE PLUS SLUGGING PERCENTAGE
  'RISP', // RUNNER IN SCORING POSITION 得点圏
  'E' // ERRORS 失策数
```

```
PITCHER

  'RANK', // 順位
  'NAME', // 名前
  'TEAM', // 所属チーム
  'ERA', // EARNED RUN AVERAGE 防御率
  'APP', // APPEARANCES 登板試合数
  'GS', // GAMES STARTED 先発出場数
  'CG', // COMPLETE GAMES 完投数
  'SHO', // SHUTOUTS 完封数
  'QS', // QUALITY START 先発投手が６回以上投げ、3自責点以内
  'W', // WINS 勝利数
  'L', // LOSS 負け数
  'HLD', // HOLD ホールド数
  'HP', // HOLD POINT ホールドポイント
  'SV', // SAVE セーブ数
  'WPCT', // WINNING PERCENTAGE 勝率
  'IP', // INNINGS PITCHED 投球回
  'H', // HITS 被安打数
  'HR', // HOME RUNS　被本塁打数
  'SO', // STRIKEOUTS 奪三振
  'SO/9', // STRIKEOUTS PER NINE INNINGS 奪三振率
  'BB', // BASES ON BALLS 与四球数
  'HBP', // HIT BY PITCH 与死球数
  'WP', // WILD PITCHES 暴投数
  'BK', // BALKS ボーク数
  'R', // RUNS 失点数
  'ER', // EARNED RUNS 自責点数
  'AVG', // BATTING AVERAGE 被打率
  'K/BB	', // STRIKEOUTS-TO-WALK RATIO 奪三振÷与四球
  'WHIP', // (WALKS+HITS)÷INNINGS PITCHED 与四球+被安打）÷投球回
```
