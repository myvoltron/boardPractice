# boardTutorial
node.js를 활용한 CRUD 게시판입니다.

참고한 사이트 : https://www.a-mean-blog.com/ko/blog/Node-JS-%EC%B2%AB%EA%B1%B8%EC%9D%8C/%EA%B2%8C%EC%8B%9C%ED%8C%90-%EB%A7%8C%EB%93%A4%EA%B8%B0

사용한 패키지는 다음과 같습니다. 

- express
- path
- express-ejs-layouts

REST api 설계는 다음과 같습니다. 

- GET /board           ; 글 목록보기
- GET /board/new       ; 글 생성창보기
- POST /board          ; 글 생성하기 
- GET /board/:id       ; 글 상세보기 
- GET /board/:id/edit  ; 글 수정창보기
- POST /board/:id      ; 글 수정하기 
- POST /delete         ; 글 삭제하기

따라서 다음과 같은 router를 만들 수 있었습니다. 

- /board에 대응하는 router
- /delete에 대응하는 router

템플릿 엔진으로 ejs를 사용했고 layout을 위해 express-ejs-layouts를 설치했습니다. 

미들웨어 흐름은 다음과 같습니다. 
<pre><code>
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({extended: false})); // querystring

// 각 url에 대한 라우터들...  
app.get('/', (req, res) => {
    res.redirect('/board');
});
app.use('/board', boardRouter);
app.use('/delete', deleteRouter);

// 유효하지 않은 url 
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// error 처리 미들웨어 
app.use((err, req, res, next) => {
     res.render('error', {
         message: err.message,
         error: err,
         status: err.status || 500,
     }); 
});
</code></pre>

1. 먼저 css 파일을 적용하기 위해 정적파일을 제공하기 위한 미들웨어를 적용했습니다.
2. ejs layout을 사용하기 위한 미들웨어
3. 요청이 왔을 때 같이 온 데이터를(있다면) 해석해서 req.body에 추가시켜주는 미들웨어들 
4. 각 url에 대한 미들웨어들 
5. 유효하지 않은 url을 잡아내는 미들웨어 
6. error 처리를 해주어서 서버가 멈추지 않게 해주는 미들웨어 


