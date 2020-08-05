# Yulingo
에빙하우스의 망각곡선을 활용한 영어 단어 예문 암기 시스템.

* 데모 사이트 : <https://yulang.dev>
* 이메일 : <yulang.dev@gmail.com>
* 개발 기간 : 2020.06.16 ~ 2020.07.26
* 기술 스택 : Spring Boot / React / Material UI / MySQL

## 설치 및 실행
<pre><code>
$ git clone https://github.com/yulangdev/yulingo
$ cd yulingo
$ ./mvnw install
$ ./mvnw package
$ java -jar target/yulingo-0.0.1-SNAPSHOT.war
</pre></code>

## 스크린샷
### 로그인 & 회원가입
![유링고1](https://user-images.githubusercontent.com/68100240/89379400-b9925b00-d730-11ea-8ffe-8155e0e30e34.png)

***

### 홈
![유링고2](https://user-images.githubusercontent.com/68100240/89379404-ba2af180-d730-11ea-80f9-7102cfaaee32.png)

***

### 학습하기
![유링고3](https://user-images.githubusercontent.com/68100240/89379406-bac38800-d730-11ea-82b7-98eab9adebc5.png)
* 제한된 시간내에 영작을 완성하면 다음 문장으로 넘어갑니다.
* 입력한 영어 단어들은 워크 뱅크에서 사라집니다.

***

### 학습기록
![유링고4](https://user-images.githubusercontent.com/68100240/89379408-bb5c1e80-d730-11ea-862d-f820c5181584.png)
* 기억률이 60% 이하인 복습이 필요한 문장은 빨간색 원으로 표시됩니다.
* 각 한국어 문장을 선택하면, 기억률, 반복횟수, 최근 일자를 볼 수 있습니다.
