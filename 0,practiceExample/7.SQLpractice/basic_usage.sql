-- 프로그램 데이터/ 실행 하는 곳  https://www.w3schools.com/mysql/trymysql.asp?filename=trysql_select_all

-- *******************************
-- SELECT - 내가 원하는 정보 가져오기
-- *******************************

-- *******************************
-- 1. 테이블의 모든 내용 보기
SELECT * FROM Customers;

-- *******************************
-- 2. 원하는 column(열)만 골라서 보기
SELECT CustomerName FROM Customers;
SELECT CustomerName, ContactName, Country FROM Customers;

-- 테이블의 컬럼이 아닌 값도 선택할 수 있다.
SELECT
  CustomerName, 1, 'Hello', NULL
FROM Customers;

-- *******************************
-- 3. 원하는 조건의 row(행)만 걸러서 보기
SELECT * FROM Orders
WHERE EmployeeID = 3;

SELECT * FROM OrderDetails 
WHERE Quantity < 5;

-- *******************************
-- 4. 원하는 순서로 데이터 가져오기
SELECT * FROM Customers
ORDER BY ContactName;

SELECT * FROM OrderDetails
ORDER BY ProductID ASC, Quantity DESC;

-- *******************************
-- 5. 원하는 만큼만 데이터 가져오기
SELECT * FROM Customers
LIMIT 10;

SELECT * FROM Customers
LIMIT 0, 10;

SELECT * FROM Customers
LIMIT 30, 10;

-- *******************************
-- 6. 원하는 별명(alias)으로 데이터 가져오기
SELECT
  CustomerId AS ID,
  CustomerName AS NAME,
  Address AS ADDR
FROM Customers;

SELECT
  CustomerId AS '아이디',
  CustomerName AS '고객명',
  Address AS '주소'
FROM Customers;

-- 모두 활용
SELECT
  CustomerID AS '아이디',
  CustomerName AS '고객명',
  City AS '도시',
  Country AS '국가'
FROM Customers
WHERE
  City = 'London' OR Country = 'Mexico'
ORDER BY CustomerName
LIMIT 0, 5;


-- *******************************
-- 7. 사칙연산
SELECT 1 + 2;
SELECT 5 - 2.5 AS DIFFERENCE;
SELECT 3 * (2 + 4) / 2, 'Hello';
SELECT 10 % 3;
-- 문자열에 사칙연산을 가하면 0으로 인식
SELECT 'ABC' + 3;
SELECT 'ABC' * 3;
SELECT '1' + '002' * 3;

SELECT
  OrderID + ProductID
FROM OrderDetails;

SELECT
  ProductName,
  Price / 2 AS HalfPrice
FROM Products;

-- *******************************
-- 8. 참/거짓 관련 연산자
SELECT TRUE, FALSE;
SELECT !TRUE, NOT 1, !FALSE, NOT FALSE;
SELECT 0 = TRUE, 1 = TRUE, 0 = FALSE, 1 = FALSE;
SELECT * FROM Customers WHERE TRUE;
SELECT * FROM Customers WHERE FALSE;

-- IS / IS NOT
SELECT TRUE IS TRUE;
SELECT TRUE IS NOT FALSE;
SELECT (TRUE IS FALSE) IS NOT TRUE;

-- AND && / OR ||
SELECT TRUE AND FALSE, TRUE OR FALSE;
SELECT 2 + 3 = 6 OR 2 * 3 = 6;

SELECT * FROM Orders
WHERE
  CustomerId = 15 AND EmployeeId = 4;

SELECT * FROM Products 
WHERE
  ProductName = 'Tofu' OR CategoryId = 8;

SELECT * FROM OrderDetails
WHERE
  ProductId = 20
  AND (OrderId = 10514 OR Quantity = 50);

-- = != <> <,> , >=, <=
SELECT 1 = 1, !(1 <> 1), NOT (1 < 2), 1 > 0 IS NOT FALSE;
SELECT 'A' = 'A', 'A' != 'B', 'A' < 'B', 'A' > 'B';
SELECT 'Apple' > 'Banana' OR 1 < 2 IS TRUE;

--기본 사칙연산자는 대소문자 구분 안함
SELECT 'A' = 'a';

SELECT
  ProductName, Price,
  Price > 20 AS EXPENSIVE 
FROM Products;

SELECT
  ProductName, Price,
  NOT Price > 20 AS CHEAP 
FROM Products;

--Between A AND B
SELECT 5 BETWEEN 1 AND 10;
SELECT 'banana' NOT BETWEEN 'Apple' AND 'camera';

SELECT * FROM OrderDetails
WHERE ProductID BETWEEN 1 AND 4;

SELECT * FROM Customers
WHERE CustomerName BETWEEN 'b' AND 'c';


-- IN / NOT IN
SELECT 1 + 2 IN (2, 3, 4) 
SELECT 'Hello' IN (1, TRUE, 'hello') 

SELECT * FROM Customers
WHERE City IN ('Torino', 'Paris', 'Portland', 'Madrid') 

--LIKE
SELECT
  'HELLO' LIKE 'hel%',
  'HELLO' LIKE 'H%',
  'HELLO' LIKE 'H%O',
  'HELLO' LIKE '%O',
  'HELLO' LIKE '%HELLO%',
  'HELLO' LIKE '%H',
  'HELLO' LIKE 'L%'

SELECT
  'HELLO' LIKE 'HEL__',
  'HELLO' LIKE 'h___O',
  'HELLO' LIKE 'HE_LO',
  'HELLO' LIKE '_____',
  'HELLO' LIKE '_HELLO',
  'HELLO' LIKE 'HEL_',
  'HELLO' LIKE 'H_O'

SELECT * FROM Employees
WHERE Notes LIKE '%economics%'

SELECT * FROM OrderDetails
WHERE OrderID LIKE '1025_'


-- 숫자로 구성된 문자열은 숫자로 자동인식


-- *******************************
--9 숫자와 관련된 함수들
--반올림 / 올림 / 내림
SELECT 
  ROUND(0.5),  --반올림
  CEIL(0.4),  --올림
  FLOOR(0.6);  --내림

SELECT 
  Price,
  ROUND(price),
  CEIL(price),
  FLOOR(price)
FROM Products;

--절대값
SELECT ABS(1), ABS(-1), ABS(3 - 10); --절대값
SELECT * FROM OrderDetails
WHERE ABS(Quantity - 10) < 5;

--최댓값 최솟값
SELECT 
  GREATEST(1, 2, 3), --최댓값
  LEAST(1, 2, 3, 4, 5);  --최솟값

SELECT
  OrderDetailID, ProductID, Quantity,
  GREATEST(OrderDetailID, ProductID, Quantity),
  LEAST(OrderDetailID, ProductID, Quantity)
FROM OrderDetails;

-- 큰 값, 작은 값, 갯수, 총합, 평균값
SELECT
  MAX(Quantity), --가장 큰 값
  MIN(Quantity), --가장 작은 값
  COUNT(Quantity), --갯수 null값 제외
  SUM(Quantity), --총합
  AVG(Quantity)  --평균 값 
FROM OrderDetails
WHERE OrderDetailID BETWEEN 20 AND 30;

--제곱 / 제곱근
SELECT
  POW(2, 3),
  POWER(5, 2),
  SQRT(16);

-- 소숫점 n자리까지 선택
SELECT
  TRUNCATE(1234.5678, 1),
  TRUNCATE(1234.5678, 2),
  TRUNCATE(1234.5678, 3),
  TRUNCATE(1234.5678, -1),
  TRUNCATE(1234.5678, -2),
  TRUNCATE(1234.5678, -3);


-- *******************************
-- 10. 문자열 관련 함수들

-- 대문자로, 소문자로
SELECT
  UPPER('abcDEF'),
  LOWER('abcDEF');

SELECT
  UCASE(CustomerName),
  LCASE(ContactName)
FROM Customers;

-- 괄호 안 내용 이어붙이기
SELECT CONCAT('HELLO', ' ', 'THIS IS ', 2021)
SELECT CONCAT_WS('-', 2021, 8, 15, 'AM') --CONCAT_WS는 -로 각 문장을 이어붙이는 것
SELECT CONCAT('O-ID: ', OrderID) FROM Orders;
SELECT
  CONCAT_WS(' ', FirstName, LastName) AS FullName
FROM Employees;

-- 문자열 자름, 왼쪽부터, 오른쪽부터
SELECT
  SUBSTR('ABCDEFG', 3),
  SUBSTR('ABCDEFG', 3, 2),
  SUBSTR('ABCDEFG', -4),
  SUBSTR('ABCDEFG', -4, 2);

SELECT
  LEFT('ABCDEFG', 3),
  RIGHT('ABCDEFG', 3);

SELECT
  OrderDate,
  LEFT(OrderDate, 4) AS Year,
  SUBSTR(OrderDate, 6, 2) AS Month,
  RIGHT(OrderDate, 2) AS Day
FROM Orders;

--문자열 바이트 길이, 문자 길이
SELECT
  LENGTH('ABCDE'),
  CHAR_LENGTH('ABCDE'),
  CHARACTER_LENGTH('ABCDE');

SELECT
  LENGTH('안녕하세요'), -- 15
  CHAR_LENGTH('안녕하세요'), -- 5
  CHARACTER_LENGTH('안녕하세요'); -- 5

-- 공백 제거
SELECT
  CONCAT('|', ' HELLO ', '|'),
  CONCAT('|', LTRIM(' HELLO '), '|'),
  CONCAT('|', RTRIM(' HELLO '), '|'),
  CONCAT('|', TRIM(' HELLO '), '|');

SELECT * FROM Categories
WHERE CategoryName = ' Beverages '

SELECT * FROM Categories
WHERE CategoryName = TRIM(' Beverages ')

-- 자릿수 채워넣기
SELECT
  LPAD('ABC', 5, '-'),
  RPAD('ABC', 5, '-');

SELECT
  LPAD(SupplierID, 5, 0),
  RPAD(Price, 6, 0)
FROM Products;

-- 대체 A 에서 B를 C로 변경
SELECT
  REPLACE('맥도날드에서 맥도날드 햄버거를 먹었다.', '맥도날드', '버거킹');
SELECT
  REPLACE(Description, ', ', ' and ')
FROM Categories;

-- STR 안에 문자 확인 , 없을 시 0
SELECT
  INSTR('ABCDE', 'ABC'),
  INSTR('ABCDE', 'BCDE'),
  INSTR('ABCDE', 'C'),
  INSTR('ABCDE', 'DE'),
  INSTR('ABCDE', 'F');

SELECT * FROM Customers
WHERE INSTR(CustomerName, ' ') BETWEEN 1 AND 6;
-- < first name이 한글자부터 다섯글자까지 이신 분들

-- A를 B 자료형으로 변환
SELECT
  '01' = '1',
  CONVERT('01', DECIMAL) = CONVERT('1', DECIMAL);

-- *******************************
-- 11. 시간/날짜 관련 함수들

-- 현재 날짜, 시간을 반환하기
SELECT CURDATE(), CURTIME(), NOW();

--문자열에 따라 날짜, 시간 생성
SELECT
  '2021-6-1' = '2021-06-01',
  DATE('2021-6-1') = DATE('2021-06-01'),
  '1:2:3' = '01:02:03',
  TIME('1:2:3') = TIME('01:02:03');

SELECT
  '2021-6-1 1:2:3' = '2021-06-01 01:02:03',
  DATE('2021-6-1 1:2:3') = DATE('2021-06-01 01:02:03'),
  TIME('2021-6-1 1:2:3') = TIME('2021-06-01 01:02:03'),
  DATE('2021-6-1 1:2:3') = TIME('2021-06-01 01:02:03'),
  DATE('2021-6-1') = DATE('2021-06-01 01:02:03'),
  TIME('2021-6-1 1:2:3') = TIME('01:02:03');

SELECT * FROM Orders
WHERE
  OrderDate BETWEEN DATE('1997-1-1') AND DATE('1997-1-31');

--DATETIME의 정보 반환
SELECT
  OrderDate,
  YEAR(OrderDate) AS YEAR, --연도 반환
  MONTHNAME(OrderDate) AS MONTHNAME, --월 반환
  MONTH(OrderDate) AS MONTH,
  WEEKDAY(OrderDate) AS WEEKDAY, --주 반환
  DAYNAME(OrderDate) AS DAYNAME, --요일명 반환
  DAY(OrderDate) AS DAY --날짜 반환
FROM Orders;

SELECT
  OrderDate,
  CONCAT(
    CONCAT_WS(
      '/',
      YEAR(OrderDate), MONTH(OrderDate), DAY(OrderDate)
    ),
    ' ',
    UPPER(LEFT(DAYNAME(OrderDate), 3))
  )
FROM Orders;

SELECT * FROM Orders
WHERE WEEKDAY(OrderDate) = 0;


-- 주어진 DATETIME의 시 분 초 반환
SELECT
  HOUR(NOW()), MINUTE(NOW()), SECOND(NOW());

--시간/ 날짜 더하기 , 빼기 
SELECT 
  ADDDATE('2021-06-20', INTERVAL 1 YEAR),
  ADDDATE('2021-06-20', INTERVAL -2 MONTH),
  ADDDATE('2021-06-20', INTERVAL 3 WEEK),
  ADDDATE('2021-06-20', INTERVAL -4 DAY),
  ADDDATE('2021-06-20', INTERVAL -5 MINUTE),
  ADDDATE('2021-06-20 13:01:12', INTERVAL 6 SECOND);

SELECT
  OrderDate,
  ADDDATE(OrderDate, INTERVAL 1 YEAR),
  ADDDATE(OrderDate, INTERVAL -2 MONTH),
  ADDDATE(OrderDate, INTERVAL 3 WEEK),
  ADDDATE(OrderDate, INTERVAL -4 DAY),
  ADDDATE(OrderDate, INTERVAL -5 MINUTE)
FROM Orders;


--두 시간 / 날짜간 일수, 시간차
SELECT
  OrderDate,
  NOW(),
  DATEDIFF(OrderDate, NOW())
FROM Orders;

SELECT
  TIMEDIFF('2021-06-21 15:20:35', '2021-06-21 16:34:41');


SELECT * FROM Orders
WHERE
  ABS(DATEDIFF(OrderDate, '1996-10-10')) < 5;

--해당 달의 마지막 날짜.
SELECT
  OrderDate,
  LAST_DAY(OrderDate),
  DAY(LAST_DAY(OrderDate)),
  DATEDIFF(LAST_DAY(OrderDate), OrderDate)
FROM Orders;

--시간/날짜를 지정한 형식으로 반환
SELECT
  DATE_FORMAT(NOW(), '%M %D, %Y %T'), --월, 일, 연도4자리, hh:mm:ss
  DATE_FORMAT(NOW(), '%y-%m-%d %h:%i:%s %p'),
  DATE_FORMAT(NOW(), '%Y년 %m월 %d일 %p %h시 %i분 %s초');

SELECT REPLACE(
  REPLACE(
    DATE_FORMAT(NOW(), '%Y년 %m월 %d일 %p %h시 %i분 %초'),
    'AM', '오전'
  ),
  'PM', '오후'
)

--날짜 s를 f 형식으로 해석하여 시간/ 날짜 생성
SELECT
  DATEDIFF(
    STR_TO_DATE('2021-06-04 07:48:52', '%Y-%m-%d %T'),
    STR_TO_DATE('2021-06-01 12:30:05', '%Y-%m-%d %T')
  ),
  TIMEDIFF(
    STR_TO_DATE('2021-06-04 07:48:52', '%Y-%m-%d %T'),
    STR_TO_DATE('2021-06-01 12:30:05', '%Y-%m-%d %T')
  );


SELECT
  OrderDate,
  DATEDIFF(
    STR_TO_DATE('1997-01-01 13:24:35', '%Y-%m-%d %T'),
    OrderDate
  ),
  TIMEDIFF(
    STR_TO_DATE('1997-01-01 13:24:35', '%Y-%m-%d %T'),
    STR_TO_DATE(CONCAT(OrderDate, ' ', '00:00:00'), '%Y-%m-%d %T')
  )
FROM Orders;

-- *******************************
-- 12. 기타 함수들

--조건이 참이라면 T, 거짓이라면 F 반환
SELECT IF (1 > 2, '1는 2보다 크다.', '1은 2보다 작다.');

--CASE
SELECT
CASE
  WHEN -1 > 0 THEN '-1은 양수다.'
  WHEN -1 = 0 THEN '-1은 0이다.'
  ELSE '-1은 음수다.'
END;

SELECT
  Price,
  IF (Price > 30, 'Expensive', 'Cheap'),
  CASE
    WHEN Price < 20 THEN '저가'
    WHEN Price BETWEEN 20 AND 30 THEN '일반'
    ELSE '고가'
  END
FROM Products;

--A가 null일 때 B출력
SELECT
  IFNULL('A', 'B'),
  IFNULL(NULL, 'B');


-- *******************************
--13. GROUP BY - 조건에 따라 집계된 값을 가져옵니다.
SELECT Country FROM Customers
GROUP BY Country;

SELECT CategoryID FROM Products
GROUP BY CategoryID;

--여러 컬럼을 기준으로 그룹화할 수도 있습니다.
SELECT 
  Country, City,
  CONCAT_WS(', ', City, Country)
FROM Customers
GROUP BY Country, City;

--그룹 함수 활용하기
SELECT
  COUNT(*), OrderDate
FROM Orders
GROUP BY OrderDate;

SELECT
  ProductID,
  SUM(Quantity) AS QuantitySum
FROM OrderDetails
GROUP BY ProductID
ORDER BY QuantitySum DESC;

SELECT
  CategoryID,
  MAX(Price) AS MaxPrice, 
  MIN(Price) AS MinPrice,
  TRUNCATE((MAX(Price) + MIN(Price)) / 2, 2) AS MedianPrice,
  TRUNCATE(AVG(Price), 2) AS AveragePrice
FROM Products
GROUP BY CategoryID;

SELECT 
  CONCAT_WS(', ', City, Country) AS Location,
  COUNT(CustomerID)
FROM Customers
GROUP BY Country, City;

-- WITH ROLLUP - 전체의 집계값
SELECT
  Country, COUNT(*)
FROM Suppliers
GROUP BY Country
WITH ROLLUP;

--HAVING - 그룹화된 데이터 걸러내기
SELECT
  Country, COUNT(*) AS Count
FROM Suppliers
GROUP BY Country
HAVING Count >= 3;

-- WHERE는 그룹하기 전 데이터, HAVING은 그룹 후 집계에 사용합니다.
SELECT
  COUNT(*) AS Count, OrderDate
FROM Orders
WHERE OrderDate > DATE('1996-12-31')
GROUP BY OrderDate
HAVING Count > 2;

SELECT
  CategoryID,
  MAX(Price) AS MaxPrice, 
  MIN(Price) AS MinPrice,
  TRUNCATE((MAX(Price) + MIN(Price)) / 2, 2) AS MedianPrice,
  TRUNCATE(AVG(Price), 2) AS AveragePrice
FROM Products
WHERE CategoryID > 2
GROUP BY CategoryID
HAVING
  AveragePrice BETWEEN 20 AND 30
  AND MedianPrice < 40;

-- *******************************
--14. DISTINCT - 중복된 값들을 제거합니다.
--GROUP BY 와 달리 집계함수가 사용되지 않습니다.
--GROUP BY 와 달리 정렬하지 않으므로 더 빠릅니다.

SELECT DISTINCT CategoryID
FROM Products;
-- 위의 GROUP BY를 사용한 쿼리와 결과 비교

SELECT COUNT DISTINCT CategoryID
FROM Products;
-- 오류 발생

SELECT DISTINCT Country
FROM Customers
ORDER BY Country;

SELECT DISTINCT Country, City
FROM Customers
ORDER BY Country, City;

--GROUP BY와 DISTINCT 함께 활용하기
SELECT
  Country,
  COUNT(DISTINCT CITY)
FROM Customers
GROUP BY Country;

-- *******************************
-- 각종 연산자들

