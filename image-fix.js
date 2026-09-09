(()=>{
  const normalize=text=>(text||'').replace(/\s+/g,' ').trim();

  const loadPngData=async paths=>{
    const parts=[];
    for(const path of paths){
      const response=await fetch(path,{cache:'no-store'});
      if(!response.ok) throw new Error(`Failed to load image data: ${path} (${response.status})`);
      parts.push((await response.text()).trim());
    }
    return `data:image/png;base64,${parts.join('')}`;
  };

  const setHospitalCover=async()=>{
    const hospitalCard=[...document.querySelectorAll('.project')].find(card=>
      normalize(card.querySelector('h3')?.textContent).includes('AI-Based Hospital Information System for Clinical and Insurance Prediction')
    );
    if(!hospitalCard) return;

    const image=hospitalCard.querySelector('.project-thumb img');
    if(!image) return;

    const src=await loadPngData([
      './assets/pngdata/h0.b64','./assets/pngdata/h1.b64','./assets/pngdata/h2.b64',
      './assets/pngdata/h3.b64','./assets/pngdata/h4.b64','./assets/pngdata/h5.b64'
    ]);
    image.src=src;
    image.removeAttribute('onerror');
  };

  const setKnhanesMainFigure=async()=>{
    const title=normalize(document.querySelector('.detail-title')?.textContent);
    if(!title.includes('Depression Risk Prediction Using KNHANES Data')) return;

    const figure=document.querySelector('.detail-section .figure');
    const image=figure?.querySelector('img');
    if(!figure||!image) return;

    const src=await loadPngData([
      '../assets/pngdata/k0.b64','../assets/pngdata/k1.b64','../assets/pngdata/k2.b64',
      '../assets/pngdata/k3.b64','../assets/pngdata/k4.b64','../assets/pngdata/k5.b64',
      '../assets/pngdata/k6.b64','../assets/pngdata/k7.b64','../assets/pngdata/k8.b64',
      '../assets/pngdata/k9a.b64','../assets/pngdata/k9b.b64','../assets/pngdata/k9c.b64',
      '../assets/pngdata/k9d.b64','../assets/pngdata/k9e.b64','../assets/pngdata/k9f.b64'
    ]);
    figure.dataset.src=src;
    image.src=src;
    image.removeAttribute('onerror');
  };

  Promise.all([setHospitalCover(),setKnhanesMainFigure()]).catch(error=>console.error('[portfolio image fix]',error));
})();
