import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import { QueryError, RowDataPacket } from "mysql2";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer1234",
  database: "reactspring",
  timezone: "Z", // 'Z'는 UTC 시간대를 의미
});

//연결 오류시 에러메시지 출력
connection.connect((err: QueryError | null) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

//관리자 로그인
app.post("/login", (req, res) => {
  const { id, pwd } = req.body;
  if (!id || !pwd) {
    return res.status(400).send("All fields are required.");
  }

  const sql = "SELECT * FROM admin WHERE id = ? AND pwd = ?";
  connection.query(sql, [id, pwd], (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send("Error logging in: " + err.message);
    }

    const rows = results as RowDataPacket[];
    if (rows.length > 0) {
      res.status(200).send("로그인 성공");
    } else {
      res.status(401).send("로그인 실패");
    }
  });
});

// 드롭다운바 목록 가져오기
app.get("/classes", (req, res) => {
  connection.query("SELECT classNum, className FROM class", (err, results) => {
    if (err) {
      console.error("반 정보를 조회하는 중 오류 발생:", err);
      res.status(500).send("반 정보 조회 실패");
      return;
    }
    res.json(results);
  });
});

// 학생 정보 입력
app.post("/register", (req, res) => {
  const { studentNum, classNum } = req.body;

  //query문 작성
  //학생 이름 - students 테이블의 studentName column에 추가
  //학생 식별 번호, 수업 식별 번호 - classStudents column에 각각 추가
  const queryStudent = "INSERT INTO students (studentName) VALUES (?)";
  const queryClassStudents =
    "INSERT INTO classStudents (classNum, studentNum) VALUES (?, LAST_INSERT_ID())";

  //오류 메시지
  connection.query(queryStudent, [studentNum], (err, result) => {
    if (err) {
      console.error("학생 정보 입력 중 오류 발생:", err);
      res.status(500).send("학생 등록에 실패했습니다");
      return;
    }
    connection.query(queryClassStudents, [classNum], (err, result) => {
      if (err) {
        console.error("반-학생 관계 데이터 입력 중 오류 발생:", err);
        res.status(500).send("반에 학생을 등록하는 데 실패했습니다");
        return;
      }
      res.send("학생 등록 성공");
    });
  });
});

// DATE_FORMAT을 사용해서 날짜형식 지정
// 출결 데이터 가져오기 (선택된 날짜 필터링)
app.get("/attendancecheck", (req, res) => {
  const { date, classNum } = req.query; //날자와 교실 식별 번호를 요청
  let query = `
      SELECT 
          s.studentName,
          DATE_FORMAT(jc.date, '%Y-%m-%d') as date,
          a.status,
          cl.className,
          cl.classNum
      FROM 
          attendance a
      JOIN 
          students s ON a.studentNum = s.studentNum
      JOIN 
          julyCalendar jc ON a.dateId = jc.dateId
      JOIN 
          classStudents cs ON s.studentNum = cs.studentNum
      JOIN 
          class cl ON cs.classNum = cl.classNum
          
  `;

  //사용자가 날짜와 수업을 선택하면 그 값을 받아서 db에 요청, join을 통해 둘 다 해당하는 데이터를 받아옴.
  const conditions = [];
  if (date) {
    conditions.push(`jc.date = '${date}'`);
  }
  if (classNum) {
    conditions.push(`cl.classNum = '${classNum}'`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  //오류 발생시 출력 메시지
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching attendance data:", err);
      res.status(500).send("Error fetching attendance data.");
      return;
    }
    console.log("Fetched Attendance Data: ", results);
    res.json(results);
  });
});

// 날짜 목록 가져오기
app.get("/dates", (req, res) => {
  //쿼리문
  const query =
    "SELECT dateId, DATE_FORMAT(date, '%Y-%m-%d') as date FROM julyCalendar";

  //오류 발생시 출력 메시지
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching dates:", err);
      res.status(500).send("Error fetching dates.");
      return;
    }
    console.log("Fetched Attendance Data: ", results);
    res.json(results);
  });
});

// 특정 시간대에 대한 학생 정보 가져오기
app.get("/students/:classNum", (req, res) => {
  const classNum = req.params.classNum;

  const query = `
    SELECT s.studentNum, s.studentName, c.className
    FROM students s
    JOIN classStudents cs ON s.studentNum = cs.studentNum
    JOIN class c ON cs.classNum = c.classNum
    WHERE cs.classNum = ?;`;

  connection.query(query, [classNum], (err, results) => {
    if (err) {
      console.error("Error fetching student data:", err);
      res.status(500).send("Error fetching student data.");
      return;
    }
    res.json(results);
  });
});

// 출석 정보 저장
app.post("/saveAttendance", (req, res) => {
  const { students, dateId, classNum } = req.body; // classNum을 req.body에서 받도록 수정

  const query = `
    INSERT INTO attendance (classNum, studentNum, dateId, status)
    VALUES (?, ?, ?, ?)
  `;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("트랜잭션 오류:", err);
      return res.status(500).send("트랜잭션 오류: " + err.message);
    }

    students.forEach((student: any) => {
      connection.query(
        query,
        [classNum, student.studentID, dateId, student.status], // classNum을 직접 사용
        (err) => {
          if (err) {
            return connection.rollback(() => {
              console.error("출석 정보 저장 중 오류 발생:", err);
              res
                .status(500)
                .send("출석 정보 저장 중 오류 발생: " + err.message);
            });
          }
        }
      );
    });

    connection.commit((err) => {
      if (err) {
        return connection.rollback(() => {
          console.error("커밋 오류:", err);
          res.status(500).send("커밋 오류: " + err.message);
        });
      }
      res.send("출석 정보 저장 성공");
    });
  });
});

app.listen(port, () => {
  console.log(`서버 실행 ${port}`);
});
