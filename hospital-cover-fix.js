(()=>{
  const applyHospitalCover=()=>{
    const card=[...document.querySelectorAll('.project')].find(card=>
      (card.querySelector('h3')?.textContent||'').includes('AI-Based Hospital Information System for Clinical and Insurance Prediction')
    );
    const img=card?.querySelector('.project-thumb img');
    if(!img)return;

    img.style.objectFit='contain';
    img.style.background='#fff';
    img.src='./assets/media/project-hospital-cover-v2.webp?v=20260910-8';
    img.dataset.coverSource='verified-webp-asset';
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyHospitalCover,{once:true});
  }else{
    applyHospitalCover();
  }
})();
