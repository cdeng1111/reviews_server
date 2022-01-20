import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 100,
  duration: '15s',
};

export default () => {
  const randProduct = Math.floor(Math.random() * 1000010);
  const res = http.get(`http://localhost:3000/reviews?product_id=${randProduct}`);
  sleep(1);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'transaction time < 10ms': (r) => r.timings.duration < 10,
    'transaction time < 25ms': (r) => r.timings.duration < 25,
    'transaction time < 50ms': (r) => r.timings.duration < 50,
    'transaction time < 100ms': (r) => r.timings.duration < 100,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
    'transaction time < 300ms': (r) => r.timings.duration < 300,
  });
};
