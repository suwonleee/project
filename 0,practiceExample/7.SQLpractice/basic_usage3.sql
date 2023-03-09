-- *******************************
-- 데이터 조작하기
-- *******************************
-- 쿼리 안에 서브 쿼리

-- *******************************
-- 1. 테이블 생성/수정/삭제
-- * CREATE TABLE - 테이블 만들기
CREATE TABLE people (
  person_id INT,
  person_name VARCHAR(10),
  age TINYINT,
  birthday DATE
);

-- * ALTER TABLE - 테이블 변경
-- 테이블명 변경
ALTER TABLE people RENAME TO  friends,
-- 컬럼 자료형 변경
CHANGE COLUMN person_id person_id TINYINT,
-- 컬럼명 변경
CHANGE COLUMN person_name person_nickname VARCHAR(10), 
-- 컬럼 삭제
DROP COLUMN birthday,
-- 컬럼 추가
ADD COLUMN is_married TINYINT AFTER age;

-- *DROP TABLE - 테이블 삭제
DROP TABLE friends;

-- *******************************
-- 2. INSERT INTO - 데이터 삽입
INSERT INTO people
  (person_id, person_name, age, birthday)
  VALUES (1, '홍길동', 21, '2000-01-31');

  -- 모든 컬럼에 값 넣을 때는 컬럼명들 생략 가능
INSERT INTO people
  VALUES (2, '전우치', 18, '2003-05-12');

  -- 일부 컬럼에만 값 넣기 가능 (NOT NULL은 생략 불가)
INSERT INTO people
  (person_id, person_name, birthday)
  VALUES (3, '임꺽정', '1995-11-04');

  -- 자료형에 맞지 않는 값은 오류 발생
INSERT INTO people
  (person_id, person_name, age, birthday)
  VALUES (1, '임꺽정', '스물여섯', '1995-11-04');

  -- 여러 행을 한 번에 입력 가능
INSERT INTO people
  (person_id, person_name, age, birthday)
  VALUES 
    (4, '존 스미스', 30, '1991-03-01'),
    (5, '루피 D. 몽키', 15, '2006-12-07'),
    (6, '황비홍', 24, '1997-10-30');

-- *******************************
-- 3. 테이블 생성시 제약 넣기
-- 테이블마다 하나만 가능
-- 기본적으로 인덱스 생성 (기본키 행 기준으로 빠른 검색 가능)
-- 보통 AUTO_INCREMENT와 함께 사용
-- ⭐ 각 행을 고유하게 식별 가능 - 테이블마다 하나씩 둘 것

INSERT INTO people 
  (person_name, nickname, age)
  VALUES ('김철수', '아이언워터', 10);

INSERT INTO people 
  (person_name, nickname, age)
  VALUES ('이불가', '임파서블', -2);
  
INSERT INTO people 
  (person_name, nickname, age, is_married)
  VALUES ('박쇳물', '아이언워터', NULL, 1);
  -- nickname에 NULL, '아이언수' 넣어보기

-- *******************************
-- 4. 자료형
-- * a. 숫자 자료형
-- TINYINT	1	-128 ~ 127	0 ~ 255
-- SMALLINT	2	-32,768 ~ 32,767	0 ~ 65,535
-- MEDIUMINT	3	-8,388,608 ~ 8,388,607	0 ~ 16,777,215
-- INT	4	-2,147,483,648 ~ 2,147,483,647	0 ~ 4,294,967,295
-- BIGINT	8	-2^63 ~ 2^63 - 1	0 ~ 2^64 - 1

-- * b. 고정 소수점(Fixed Point) 수
-- 좁은 범위의 수 표현 가능, 정확한 값
-- 자료형	설명	범위
-- DECIMAL( s, d )	실수 부분 총 자릿수( s ) & 소수 부분 자릿수 ( d )	s 최대 65

️-- * c. 부동 소수점(Floating Point) 수
-- 넓은 범위의 수 표현 가능, 정확하지 않은 값 (일반적으로 충분히 정확)
-- 자료형	표현 범위
-- FLOAT	-3.402...E+38 ~ -1.175...E-38 , 0 , 1.175...E-38 ~ 3.402...E+38
-- DOUBLE	-1.797...E+308 ~ -2.225E-308 , 0 , 2.225...E-308 ~ 1.797...E+308
