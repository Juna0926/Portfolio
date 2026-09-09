(()=>{
  const applyHospitalCover=()=>{
    const card=[...document.querySelectorAll('.project')].find(card=>
      (card.querySelector('h3')?.textContent||'').includes('AI-Based Hospital Information System for Clinical and Insurance Prediction')
    );
    const img=card?.querySelector('.project-thumb img');
    if(!img)return;

    img.style.objectFit='contain';
    img.style.background='#fff';
    img.src='https://raw.githubusercontent.com/Juna0926/Portfolio/9f36169fef725e7c00dcf0c946d8c475fa827a9f/assets/media/project-hospital-cover.png';
    img.dataset.coverSource='pinned-original-raw';
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyHospitalCover,{once:true});
  }else{
    applyHospitalCover();
  }
})();
