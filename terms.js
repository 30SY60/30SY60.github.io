const termList = document.querySelectorAll('.term-list li');
const modal = document.getElementById('definition-modal');
const defTitle = document.getElementById('def-title');
const defContent = document.getElementById('def-content');

// 🔸 직접 등록한 용어 설명
const definitions = {
  "PER": "PER(주가수익비율)은 주가를 주당순이익으로 나눈 값으로, 낮을수록 저평가된 주식일 수 있습니다.",
  "PBR": "PBR(주가순자산비율)은 주가를 주당순자산으로 나눈 값으로, 1보다 낮으면 저평가된 경우로 해석할 수 있습니다.",
  "시가총액": "시가총액은 주식의 총 가치로, 주가에 총 발행 주식을 곱한 값입니다.",
  "ROE": "ROE(자기자본이익률)은 기업이 자기자본을 활용해 얼마나 이익을 냈는지를 나타냅니다.",
  "배당수익률": "배당수익률은 주가 대비 배당금 비율로, 투자 수익률의 지표로 사용됩니다."
};

termList.forEach(li => {
  li.addEventListener('click', () => {
    const term = li.getAttribute('data-term');

    if (definitions[term]) {
      // 등록된 설명이 있는 경우
      defTitle.textContent = term;
      defContent.textContent = definitions[term];
      modal.style.display = 'block';
    } else {
      // 등록된 설명이 없으면 위키피디아 API 호출
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
    }
  });
});

function closeDefModal() {
  modal.style.display = 'none';
}