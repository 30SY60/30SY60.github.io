const termList = document.querySelectorAll('.term-list li');
const modal = document.getElementById('definition-modal');
const defTitle = document.getElementById('def-title');
const defContent = document.getElementById('def-content');

termList.forEach(li => {
  li.addEventListener('click', () => {
    const term = li.getAttribute('data-term');

    // Wikipedia API 호출 (원하면 다른 API로 변경 가능)
    fetch(`https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`)
      .then(res => res.json())
      .then(data => {
        defTitle.textContent = data.title || term;
        defContent.textContent = data.extract || '설명을 찾을 수 없습니다.';
        modal.style.display = 'block';
      })
      .catch(() => {
        defTitle.textContent = term;
        defContent.textContent = '설명을 불러오지 못했습니다.';
        modal.style.display = 'block';
      });
  });
});

function closeDefModal() {
  modal.style.display = 'none';
}