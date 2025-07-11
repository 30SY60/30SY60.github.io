const domain_name = 'https://5973564db067.ngrok-free.app'

// 메시지 API 호출
fetch(domain_name + '/api/message', {
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
fetch(domain_name + '/api/top20', {
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

function closeDefModal() {
  document.getElementById('definition-modal').style.display = 'none';
}