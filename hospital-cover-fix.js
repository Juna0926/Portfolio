(()=>{
  const applyHospitalCover=()=>{
    const card=[...document.querySelectorAll('.project')].find(card=>
      (card.querySelector('h3')?.textContent||'').includes('AI-Based Hospital Information System for Clinical and Insurance Prediction')
    );
    const img=card?.querySelector('.project-thumb img');
    if(!img)return;

    img.style.objectFit='contain';
    img.style.background='#fff';
    img.src='./assets/media/project-hospital-cover.png?v=20260910-6';
    img.dataset.coverSource='restored-original-png';
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyHospitalCover,{once:true});
  }else{
    applyHospitalCover();
  }
})();
