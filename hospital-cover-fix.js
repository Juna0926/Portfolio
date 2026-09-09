(()=>{
  const applyHospitalCover=async()=>{
    const card=[...document.querySelectorAll('.project')].find(card=>
      (card.querySelector('h3')?.textContent||'').includes('AI-Based Hospital Information System for Clinical and Insurance Prediction')
    );
    const img=card?.querySelector('.project-thumb img');
    if(!img)return;

    img.style.objectFit='contain';
    img.style.background='#fff';

    try{
      const response=await fetch('./assets/media/project-hospital-cover-hq.png.b64?v=20260910-5',{cache:'no-store'});
      if(!response.ok)throw new Error(`cover fetch failed: ${response.status}`);
      const base64=(await response.text()).replace(/\s+/g,'');
      if(!base64.startsWith('iVBORw0KGgo'))throw new Error('invalid PNG base64 source');
      img.src=`data:image/png;base64,${base64}`;
      img.dataset.coverSource='hospital-hq-base64';
    }catch(error){
      console.error('Hospital cover fallback:',error);
      img.src='./assets/media/project-hospital-cover.png?v=20260910-5';
    }
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyHospitalCover,{once:true});
  }else{
    applyHospitalCover();
  }
})();
