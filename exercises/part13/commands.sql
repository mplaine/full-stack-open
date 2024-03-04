CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title  TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Cliff Crocker', 'https://www.speedcurve.com/blog/on-demand-web-performance-testing/', 'NEW: On-demand testing in SpeedCurve!');
INSERT INTO blogs (author, url, title) VALUES ('Andy Davies', 'https://www.speedcurve.com/blog/debugging-interaction-to-next-paint-inp/', 'Debugging Interaction to Next Paint (INP)');
