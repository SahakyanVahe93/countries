import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function ReactHooksExample() {
  const [dey, setDey] = useState('lite');
  const [active, setActive] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = useRef(null);

  useEffect(() => {
    async function requestNumData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${active}`);
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    }

    requestNumData();
  }, [active]);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', dey);
  }, [dey]);

  const animateTitle = useCallback(() => {
    if (title.current) {
      const TitleData = [...title.current.innerText];
      title.current.innerText = '';
      title.current.innerHTML = TitleData.map(item => `<span>${item}</span>`).join('');
      [...title.current.children].forEach((item, index) => {
        item.style.display = 'inline-block';
        item.style.animation = `animates 3s linear ${0.05 * index}s 2 alternate`;
        setTimeout(() => {
          item.style.animation = '';
        }, 6100 + 0.05 * index * 500);
      });
    }
  }, []);

  return (
    <div className="container mb-5">
      <div className="display-6" ref={title}>
        React_JS_HOOKS_EXAMPLES
      </div>
      <button
        className="material-symbols-outlined btn btn-dark"
        onClick={() => setDey(dey === 'lite' ? 'dark' : 'lite')}
      >
        {dey === 'lite' ? 'partly_cloudy_day' : 'partly_cloudy_night'}
      </button>
      <button className="btn btn-success m-1" onClick={animateTitle}>
        Change
      </button>

      <hr />
      <div className="container">
        {loading && <span className="display-6">Loading..</span>}
        {error && <span className="display-6 text-danger">{error}</span>}
        {data && (
          <div className="p-3 shadow-sm bg-dark-subtle m-2">
            <h2>{data.title}</h2>
            <p>{data.body}</p>
          </div>
        )}
      </div>

      <div className="btn-group btn-group-sm">
        {numbers.map((item, index) => (
          <button
            className={`btn btn-dark p-2 ${active === item ? 'active' : ''}`}
            key={index}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
