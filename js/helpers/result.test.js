import {expect} from 'chai';

import {getRandom, getDeclensionWord} from './utils.js';
import Result from './result.js';

describe(`result`, () => {
  let scoreData = [];

  describe(`score`, () => {
    beforeEach(() => {
      scoreData = [];
      for (let i = 0; i < 10; i++) {
        scoreData.push({result: true, time: 300 - getRandom(9 * i, 10 * i)});
      }
    });

    it(`should return -1 when the answers value < 10 or false answers have length 3`, () => {
      const expected = -1;
      const actual1 = (new Result([])).score;
      const actual2 = (new Result(scoreData.slice(0, 3))).score;
      const actual3 = (new Result(scoreData.slice(0, 9))).score;

      scoreData[3].result = false;
      scoreData[5].result = false;
      scoreData[9].result = false;
      const actual4 = (new Result(scoreData)).score;

      expect(actual1).to.equal(expected);
      expect(actual2).to.equal(expected);
      expect(actual3).to.equal(expected);
      expect(actual4).to.equal(expected);
    });

    it(`should return 20 when the answers are true and fast`, () => {
      const expected = 20;
      const actual = (new Result(scoreData)).score;

      expect(actual).to.equal(expected);
    });

    it(`should return correct value when the all answers are true and some answers not fast`, () => {
      scoreData[0].time = 60;
      const expected1 = 19;
      const actual1 = (new Result(scoreData)).score;

      scoreData[8].time = 36;
      scoreData[9].time = 5;
      const expected2 = 17;
      const actual2 = (new Result(scoreData)).score;

      expect(actual1).to.equal(expected1);
      expect(actual2).to.equal(expected2);
    });

    it(`should return correct value when the some answers are not true`, () => {
      scoreData[0].result = false;
      const expected1 = 16;
      const actual1 = (new Result(scoreData)).score;

      scoreData[1].result = false;
      scoreData[9].time = 60;
      const expected2 = 11;
      const actual2 = (new Result(scoreData)).score;

      expect(actual1).to.equal(expected1);
      expect(actual2).to.equal(expected2);
    });
  });

  describe(`info`, () => {
    const successResult = `Вы&nbsp;заняли {i}-ое место из&nbsp;{g}&nbsp;игроков.<br>Это лучше, чем у&nbsp;{p}% игроков`;
    const timeOverResult = `Время вышло!<br>Вы&nbsp;не&nbsp;успели отгадать все мелодии`;
    const attemptsEndedResult = `У&nbsp;вас закончились все попытки.<br>Ничего, повезёт в&nbsp;следующий раз!`;

    beforeEach(() => {
      scoreData = [];
      for (let i = 0; i < 10; i++) {
        scoreData.push({result: true, time: 300 - getRandom(9 * i, 10 * i)});
      }
    });

    it(`should return timeOverResult when the own result equals -1 and time equals 0`, () => {
      const actual = (new Result(scoreData.slice(0, 3), [])).info.text;

      expect(actual).to.equal(timeOverResult);
    });

    it(`should return attemptsEndedResult when the own result equals -1 and lives equal 0`, () => {
      scoreData[3].result = false;
      scoreData[5].result = false;
      scoreData[9].result = false;
      const actual = (new Result(scoreData, [])).info.text;

      expect(actual).to.equal(attemptsEndedResult);
    });

    it(`should return successResult when the own result is success`, () => {
      const otherResultsData = [13, 17, 16, 19, 11, 15, 15, 1, 3];
      let scoreData1 = [];
      let scoreData2 = [];
      for (let i = 0; i < 10; i++) {
        scoreData1.push({result: true, time: 300 - (i + 1) * 10});
        scoreData2.push({result: true, time: 300 - (i + 1) * 30});
      }
      const expected1 = successResult.replace(`{i}`, 1).replace(`{g}`, 10).replace(`{p}`, 90);
      const expected2 = successResult.replace(`{i}`, 1).replace(`{g}&nbsp;игроков`, `1&nbsp;игрока`).replace(`{p}`, 100);

      const actual1 = (new Result(scoreData, otherResultsData)).info.text;
      const actual2 = (new Result(scoreData, [])).info.text;

      expect(actual1).to.equal(expected1);
      expect(actual2).to.equal(expected2);
    });
  });

  describe(`getDeclensionWord`, () => {
    it(`should return other version`, () => {
      const data = {other: `игроков`};

      const actual1 = getDeclensionWord(1, data);
      const actual2 = getDeclensionWord(3, data);
      const actual3 = getDeclensionWord(16, data);
      const actual4 = getDeclensionWord(107, data);

      expect(actual1).to.equal(`игроков`);
      expect(actual2).to.equal(`игроков`);
      expect(actual3).to.equal(`игроков`);
      expect(actual4).to.equal(`игроков`);
    });

    it(`should return one and other versions`, () => {
      const data = {one: `игрока`, other: `игроков`};

      const actual1 = getDeclensionWord(1, data);
      const actual2 = getDeclensionWord(3, data);
      const actual3 = getDeclensionWord(16, data);
      const actual4 = getDeclensionWord(107, data);

      expect(actual1).to.equal(`игрока`);
      expect(actual2).to.equal(`игроков`);
      expect(actual3).to.equal(`игроков`);
      expect(actual4).to.equal(`игроков`);
    });

    it(`should return one, few and other versions`, () => {
      const data = {one: `игрок`, few: `игрока`, other: `игроков`};

      const actual1 = getDeclensionWord(1, data);
      const actual2 = getDeclensionWord(3, data);
      const actual3 = getDeclensionWord(16, data);
      const actual4 = getDeclensionWord(107, data);

      expect(actual1).to.equal(`игрок`);
      expect(actual2).to.equal(`игрока`);
      expect(actual3).to.equal(`игроков`);
      expect(actual4).to.equal(`игроков`);
    });

    it(`should return one, few, many and other versions`, () => {
      const data = {one: `игрок`, few: `игрока`, many: `игроков`, other: `игрока`};

      const actual1 = getDeclensionWord(1, data);
      const actual2 = getDeclensionWord(3, data);
      const actual3 = getDeclensionWord(16, data);
      const actual4 = getDeclensionWord(1.5, data);

      expect(actual1).to.equal(`игрок`);
      expect(actual2).to.equal(`игрока`);
      expect(actual3).to.equal(`игроков`);
      expect(actual4).to.equal(`игрока`);
    });
  });
});
