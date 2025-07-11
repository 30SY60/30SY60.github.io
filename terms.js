const termList = document.querySelectorAll('.term-list li');
const modal = document.getElementById('definition-modal');
const defTitle = document.getElementById('def-title');
const defContent = document.getElementById('def-content');

// 🔸 직접 등록한 용어 설명
const definitions = {
  "PER": "주가수익비율(PER)은 주식 가격이 회사가 버는 돈에 비해 비싼지 싼지를 알려주는 숫자야.\
          예를 들어, PER이 10이면 사람들이 그 회사 주식을 살 때, 회사가 1년 동안 버는 돈의 10배 값을 주고 산다는 뜻이야.\
          PER이 높으면 '이 회사 주식은 좀 비싼가?' 하고 생각할 수 있어.\
          PER이 낮으면 '이 회사 주식은 싸네!'라고 느낄 수 있지.\
          하지만 싸다고 무조건 좋은 건 아니고, 회사의 성장 가능성도 함께 봐야 해!",
  "PBR": "PBR은 회사의 진짜 가진 물건(자산)과 주식 가격을 비교한 거야.\
          예를 들어, PBR이 1이면 회사가 가진 가치랑 주식 가격이 비슷하다는 뜻이야.\
          PBR이 높으면 '좀 비싸게 팔리고 있네?' 생각할 수 있어.\
          PBR이 낮으면 '싸게 살 수 있나?' 싶지만 이유는 잘 살펴봐야 해.\
          그 회사가 잘될 가능성이 있는지도 함께 봐야 해!",
  "시가총액": "시가총액은 회사 전체의 값을 말해.\
              그 회사 주식 가격에 주식 수를 곱하면 나와!\
              예를 들어, 사과 1개가 1,000원인데 100개 있으면 총 10만 원이겠지?\
              그런 식으로 계산하는 거야.\
              시가총액이 크면 큰 회사, 작으면 작은 회사야.",
  "ROE": "ROE는 회사가 주인의 돈으로 얼마나 돈을 잘 벌었는지 보여주는 숫자야.\
          쉽게 말해, 내가 100원을 맡겼는데 회사가 10원을 벌었다면 ROE는 10%야.\
          ROE가 높으면 '와! 일 잘하네!'라고 볼 수 있어.\
          낮으면 '음… 돈 버는 실력이 약하네?'라고 할 수 있지.\
          그래서 투자할 때 많이 보는 숫자야!",
  "배당수익률": "배당수익률은 회사가 주주에게 얼마나 돈을 나눠주는지 알려주는 거야.\
                예를 들어, 주식이 10,000원인데 500원을 준다면 배당수익률은 5%야.\
                이 숫자가 높으면 주식 사면 돈이 많이 들어올 수 있다는 뜻이지.\
                하지만 배당이 많다고 항상 좋은 회사는 아닐 수도 있어.\
                회사의 전체 상태도 함께 보는 게 중요해!"
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