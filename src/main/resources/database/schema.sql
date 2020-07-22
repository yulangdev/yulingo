use yulangdev;

/*
 *  문장
 */

create table Sentence (
  sentenceId      int           primary key auto_increment,
  englishSentence varchar(255)  not null,
  koreanSentence  varchar(255)  not null
);

/*
 *  학생
 */

create table Student (
  studentId   int           primary key auto_increment,
  username    varchar(255)  not null unique,
  password    varchar(255)  not null
);

/*
 *  기록
 */

create table Record (
  recordId        int           primary key auto_increment,
  studentId       int           not null,
  sentenceId      int           not null,
  learnedDatetime datetime      not null default current_timestamp,
  index (studentId, sentenceId, learnedDatetime),
  foreign key (studentId)   references Student (studentId),
  foreign key (sentenceId)  references Sentence (sentenceId)
);

/*
 * 기록 통계
 */
create view RecordStatistic as
  select
    recordId                                            as recordId,
    studentId                                           as studentId,
    sentenceId                                          as sentenceId,
    count(learnedDatetime)                              as repeatTimes,
    min(learnedDatetime)                                as firstDatetime,
    max(learnedDatetime)                                as lastDatetime,
    timestampdiff(minute, max(learnedDatetime), now())  as pastMinutes,
    timestampdiff(hour,   max(learnedDatetime), now())  as pastHours,
    timestampdiff(day,    max(learnedDatetime), now())  as pastDays,
    timestampdiff(month,  max(learnedDatetime), now())  as pastMonths,
    round(100 * (1.84 / (pow(log(10, greatest(1, timestampdiff(minute, max(learnedDatetime), now()))), 1.25) / count(learnedDatetime) + 1.84))) as savingRate
  from Record
  group by studentId, sentenceId;

/*
 * 기록 통계 상세
 */
create view RecordDetail as
  select
    r.recordId        as recordId,
    r.studentId       as studentId,
    r.sentenceId      as sentenceId,
    r.repeatTimes     as repeatTimes,
    r.firstDatetime   as firstDatetime,
    r.lastDatetime    as lastDatetime,
    r.pastMinutes     as pastMinutes,
    r.pastHours       as pastHours,
    r.pastDays        as pastDays,
    r.pastMonths      as pastMonths,
    r.savingRate      as savingRate,
    s.englishSentence as englishSentence,
    s.koreanSentence  as koreanSentence
  from RecordStatistic as r
  join Sentence as s on r.sentenceId = s.sentenceId;
