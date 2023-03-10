import request from "supertest";
import app from "../src/app";

describe("/service/github", () => {
  it("post token", async () => {
    let token =
      "eyJraWQiOiI2RjUwMTE4NC1EOEQ0LTRGMzUtQUY0MS1DNTBBRjc3ODEwNzAiLCJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLW1pY3Jvc2VydmljZS5jb20iLCJzdWIiOiJ1c2VyLWlkLTEyMzU2IiwiYXVkIjoidG9rZW4tbWljcm9zZXJ2aWNlIiwic2VydmljZVRva2VuIjoiMTIzNC4xMjM0LjEyMzM0NSIsImFwcGxpY2F0aW9uSUQiOiIxMjg5NTc5MTg3NTA5MTAxIiwic2VydmljZUlEIjoiZ2l0aHViLTAwMSIsImV4cCI6MTczNTY4OTYwMCwiaWF0IjoxNjc4MzM2NTY5fQ.jx7YSeaYc5tCywc38LEhIfysT8iCcRHLWCAQSCf9pDFW3NCTfjvVZxo04YC7Y0ib6kfR1jMeejvrrI1GibSgb90ptzEtKUPZe3xnJMHWnEMl1No9Q9iL5hDUJbKAuK4n06OAQNiDmQeQS1AukSPCMH9meNkHdY2iWgB-7yZaeNZj5uWTyqIEECRzpR3yrN9D2DKrboOAqFecjCOujuCCr8hsuZFNvCVHHWorj0yNLP1y7zzuDE7H5N9UvWkZB1ct0kYRIPODb2THsLT_AWJxjrP86QJWLz1C6GO8VG1Ar_kiUKeqJbQ_TexXFcSMMiA6QLPsO_Zr7OKPVU0wy998SA";
    let response = await request(app)
      .post("/service/github")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.status).toEqual("ok");
  });

  it("get token", async () => {
    let token =
      "eyJraWQiOiI2RjUwMTE4NC1EOEQ0LTRGMzUtQUY0MS1DNTBBRjc3ODEwNzAiLCJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLW1pY3Jvc2VydmljZS5jb20iLCJzdWIiOiJ1c2VyLWlkLTEyMzU2IiwiYXVkIjoidG9rZW4tbWljcm9zZXJ2aWNlIiwic2VydmljZVRva2VuIjoiMTIzNC4xMjM0LjEyMzM0NSIsImFwcGxpY2F0aW9uSUQiOiIxMjg5NTc5MTg3NTA5MTAxIiwic2VydmljZUlEIjoiZ2l0aHViLTAwMSIsImV4cCI6MTczNTY4OTYwMCwiaWF0IjoxNjc4MzM2NTY5fQ.jx7YSeaYc5tCywc38LEhIfysT8iCcRHLWCAQSCf9pDFW3NCTfjvVZxo04YC7Y0ib6kfR1jMeejvrrI1GibSgb90ptzEtKUPZe3xnJMHWnEMl1No9Q9iL5hDUJbKAuK4n06OAQNiDmQeQS1AukSPCMH9meNkHdY2iWgB-7yZaeNZj5uWTyqIEECRzpR3yrN9D2DKrboOAqFecjCOujuCCr8hsuZFNvCVHHWorj0yNLP1y7zzuDE7H5N9UvWkZB1ct0kYRIPODb2THsLT_AWJxjrP86QJWLz1C6GO8VG1Ar_kiUKeqJbQ_TexXFcSMMiA6QLPsO_Zr7OKPVU0wy998SA";
    let response = await request(app)
      .get("/service/github/one")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual({
      status: "ok",
      secret: {
        userid: "user-id-12356",
        secrets: '[{"secret":"1234.1234.123345","serviceid":"github-001"}]',
      },
    });
  });

  it("get token - bad serviceid", async () => {
    let token =
      "eyJraWQiOiI2RjUwMTE4NC1EOEQ0LTRGMzUtQUY0MS1DNTBBRjc3ODEwNzAiLCJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLW1pY3Jvc2VydmljZS5jb20iLCJzdWIiOiJ1c2VyLWlkLTEyMzU2IiwiYXVkIjoidG9rZW4tbWljcm9zZXJ2aWNlIiwic2VydmljZVRva2VuIjoiMTIzNC4xMjM0LjEyMzM0NSIsImFwcGxpY2F0aW9uSUQiOiIxMjg5NTc5MTg3NTA5MTAxIiwiZXhwIjoxNzM1Njg5NjAwLCJpYXQiOjE2NzgzMzY1Njl9.JISBg97B_rjyX0-z1hc3HbTderqtJ7btTtY-QBYAkJrjifOLM1odU5h4wPUMr5btiNw67sanJBPDyc9LpX7n6aQ52oEuvcQxLJcY4tUA7dwyOLmyGyLDy16u-uiRIX6xw_0lxIKEiJjnHcvRLs8vTdvLHTHxzN5pyaI_h0JCeqnkJNA1791HXy127vgMfkz2wUK6d26_PaIniRaXKdyRD4tYqa49ukLGuP-Lf1PmtvICJm2PEAUNi71aCHregWd1N7lGZ0qz_lVgbx96pIxDVYg60QYXCx3yIt5j12fL5PEQDCct0E74SS9ugXxltfiHP6tT_iGx1io-1RK1Dxn0NA";
    let response = await request(app)
      .get("/service/github/one")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(response.body);
    expect(response.body.status).toEqual(
      "error - no service id supplied. Needed for single token retrieval."
    );
  });

  it("post second service token", async () => {
    let token =
      "eyJraWQiOiI2RjUwMTE4NC1EOEQ0LTRGMzUtQUY0MS1DNTBBRjc3ODEwNzAiLCJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLW1pY3Jvc2VydmljZS5jb20iLCJzdWIiOiJ1c2VyLWlkLTEyMzU2IiwiYXVkIjoidG9rZW4tbWljcm9zZXJ2aWNlIiwic2VydmljZVRva2VuIjoiMTIzNC4xMjM0LjY1NDMyMTEiLCJhcHBsaWNhdGlvbklEIjoiMTI4OTU3OTE4NzUwOTEwMSIsInNlcnZpY2VJRCI6ImdpdGh1Yi0wMDIiLCJleHAiOjE3MzU2ODk2MDAsImlhdCI6MTY3ODMzNjU2OX0.P5ZEGLZfw9hxbBwsD0es9g9sFt6um6In9huhGyN9FwXqG9CY_O2tHnL-tc1eFiC7hrHVdalYaHSg37Kaz0AK-a9O87CZbbVvkNa3_tFhE9MUQldAEvbKt04HgawgTXQIvIqtuTkDtU84i2Ee_dUJjDxQM9W7WXdR-J6B0BDLHQbEW_XOpHB1_YYFhFSe8UIbzBXE0cyu8L0Ibagq7BZuNSQHVNvlk6ZIrjnf0jQGW0xAyXEK73KqqxGpYpbCQO5MKKGClprb7ZCsZEZRdQZtHFUjiakOYMvk0T7FcIEFV4CqJ8s5hzrunRtbrys2Y8ahVcAIVgbDcN8LBK2G8jt9cw";
    let response = await request(app)
      .post("/service/github")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.status).toEqual("ok");
  });

  it("get multiple tokens", async () => {
    let token =
      "eyJraWQiOiI2RjUwMTE4NC1EOEQ0LTRGMzUtQUY0MS1DNTBBRjc3ODEwNzAiLCJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Rva2VuLW1pY3Jvc2VydmljZS5jb20iLCJzdWIiOiJ1c2VyLWlkLTEyMzU2IiwiYXVkIjoidG9rZW4tbWljcm9zZXJ2aWNlIiwic2VydmljZVRva2VuIjoiMTIzNC4xMjM0LjEyMzM0NSIsImFwcGxpY2F0aW9uSUQiOiIxMjg5NTc5MTg3NTA5MTAxIiwic2VydmljZUlEIjoiZ2l0aHViLTAwMSIsImV4cCI6MTczNTY4OTYwMCwiaWF0IjoxNjc4MzM2NTY5fQ.jx7YSeaYc5tCywc38LEhIfysT8iCcRHLWCAQSCf9pDFW3NCTfjvVZxo04YC7Y0ib6kfR1jMeejvrrI1GibSgb90ptzEtKUPZe3xnJMHWnEMl1No9Q9iL5hDUJbKAuK4n06OAQNiDmQeQS1AukSPCMH9meNkHdY2iWgB-7yZaeNZj5uWTyqIEECRzpR3yrN9D2DKrboOAqFecjCOujuCCr8hsuZFNvCVHHWorj0yNLP1y7zzuDE7H5N9UvWkZB1ct0kYRIPODb2THsLT_AWJxjrP86QJWLz1C6GO8VG1Ar_kiUKeqJbQ_TexXFcSMMiA6QLPsO_Zr7OKPVU0wy998SA";
    let response = await request(app)
      .get("/service/github/all")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    console.log(response.body);
    expect(response.body.status).toEqual("ok");
  });
});
