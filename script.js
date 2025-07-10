// 메시지 API 호출
fetch('https://0f6c6601e158.ngrok-free.app/api/message', {
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
})
  .then(res => res.json())
  .then(data => {
    console.log('메시지:', data.message);
  })
  .catch(err => {
    console.error('메시지 API 오류:', err);
  });

// 주식 데이터 API 호출
fetch('https://0f6c6601e158.ngrok-free.app/api/top20', {
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
})
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      document.getElementById('message').textContent = '상위 20개 종목 데이터를 불러오지 못했습니다.';
      return;
    }

    const tbody = document.querySelector('#stock-table tbody');
    tbody.innerHTML = '';

    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item['종목명']}</td>
        <td>${item['현재가']}</td>
        <td>${item['전일비']}</td>
        <td>${item['등락률']}</td>
        <td>${item['거래량'].toLocaleString()}</td>
        <td>${item['외국인비율'] ? item['외국인비율'] : '-'}</td>
        <td>${item['PER'] ? item['PER'] : '-'}</td>
        <td>${item['PBR'] ? item['PBR'] : '-'}</td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('message').style.display = 'none';
    document.getElementById('stock-table').style.display = 'table';
  })
  .catch(err => {
    document.getElementById('message').textContent = '주식 데이터를 불러오는 데 실패했습니다.';
    console.error('주식 데이터 오류:', err);
  });

// 단어 설명 기능
document.querySelectorAll('.stock-term').forEach(el => {
  el.addEventListener('click', () => {
    const term = el.getAttribute('data-term');
    fetch(`https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('def-title').textContent = data.title || term;
        document.getElementById('def-content').textContent = data.extract || '설명을 찾을 수 없습니다.';
        document.getElementById('definition-modal').style.display = 'block';
      })
      .catch(err => {
        document.getElementById('def-content').textContent = 'API 오류: 설명을 불러오지 못했습니다.';
        document.getElementById('definition-modal').style.display = 'block';
        console.error(err);
      });
  });
});

function closeDefModal() {
  document.getElementById('definition-modal').style.display = 'none';
}