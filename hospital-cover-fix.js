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
      const urls=[
        './assets/media/hospital-cover-part0.b64?v=20260910-7',
        './assets/media/hospital-cover-part1.b64?v=20260910-7',
        './assets/media/hospital-cover-part2.b64?v=20260910-7'
      ];
      const parts=await Promise.all(urls.map(async url=>{
        const response=await fetch(url,{cache:'no-store'});
        if(!response.ok)throw new Error(`Hospital cover chunk load failed: ${response.status}`);
        return response.text();
      }));
      const base64=parts.join('').replace(/\s+/g,'');
      img.src=`data:image/webp;base64,${base64}`;
      img.dataset.coverSource='verified-chunked-webp';
    }catch(error){
      console.error('Hospital cover load failed',error);
    }
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyHospitalCover,{once:true});
  }else{
    applyHospitalCover();
  }
})();
