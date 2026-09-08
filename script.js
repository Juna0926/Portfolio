(()=>{
  const root=document.documentElement;
  const themeButton=document.getElementById('themeToggle');
  const menuButton=document.getElementById('menuToggle');
  const mobileMenu=document.getElementById('mobileMenu');
  const topButton=document.getElementById('top');
  const dialog=document.getElementById('lightbox');
  const dialogImage=document.getElementById('lightImg');
  const dialogCaption=document.getElementById('caption');
  const closeButton=document.getElementById('close');
  const preferred=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';

  const setTheme=theme=>{
    root.dataset.theme=theme;
    localStorage.setItem('theme',theme);
    const meta=document.querySelector('meta[name=theme-color]');
    if(meta)meta.content=theme==='dark'?'#1c1c1d':'#fff';
  };
  setTheme(localStorage.getItem('theme')||preferred);

  themeButton?.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
  menuButton?.addEventListener('click',()=>{
    const open=mobileMenu?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(Boolean(open)));
  });
  mobileMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded','false');
  }));

  const reveal=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
    }),{threshold:.05});
    reveal.forEach(el=>observer.observe(el));
  }else{
    reveal.forEach(el=>el.classList.add('visible'));
  }

  addEventListener('scroll',()=>topButton?.classList.toggle('show',scrollY>400),{passive:true});
  topButton?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  document.querySelectorAll('.figure').forEach(button=>button.addEventListener('click',()=>{
    if(!dialog||!dialogImage||!dialogCaption)return;
    const preview=button.querySelector('img');
    dialogImage.src=preview?.currentSrc||preview?.src||button.dataset.src||'';
    dialogImage.alt=button.dataset.caption||'';
    dialogCaption.textContent=button.dataset.caption||'';
    dialog.showModal();
  }));
  closeButton?.addEventListener('click',()=>dialog?.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

  const repoMap=[
    ['Longitudinal Behavioral Anomaly Detection for Depression Monitoring Using Passive Smartphone Sensing Data','https://github.com/Juna0926/brighten-time-series-anomaly-detection'],
    ['Data-Efficient Stoma Lesion Localization via WSOL and Pseudo-Label Refinement with Domain Knowledge','https://github.com/Juna0926/stoma-lesion-localization'],
    ['Deep Learning-Based Stoma Image Classification for Remote Patient Monitoring','https://github.com/Juna0926/stoma-image-classification'],
    ['Digital Phenotype-Based Mental Health Prediction and Derived Feature Contribution Analysis','https://github.com/Juna0926/digital-phenotype-mental-health'],
    ['Depression Risk Prediction Using KNHANES Data','https://github.com/Juna0926/knhanes-depression-risk'],
    ['Proposal for Expanding DRT Service Areas in Gyeonggi Province','https://github.com/Juna0926/ddokbus-service-area-analysis'],
    ['Risk-Based Prioritization of Heated Pavement Deployment','https://github.com/Juna0926/heated-pavement-prioritization']
  ];
  const repoFor=text=>{
    const normalized=(text||'').replace(/\s+/g,' ').trim();
    return repoMap.find(([key])=>normalized.includes(key))?.[1];
  };

  document.querySelectorAll('.research,.project').forEach(card=>{
    const url=repoFor(card.querySelector('h3')?.textContent);
    if(!url||card.querySelector('.repo-link'))return;
    const anchor=document.createElement('a');
    anchor.className='detail-link repo-link';
    anchor.href=url;
    anchor.target='_blank';
    anchor.rel='noopener';
    anchor.textContent='repository ↗';
    const details=card.querySelector('.detail-link');
    if(details)details.insertAdjacentElement('afterend',anchor);
    else card.querySelector('.copy,div')?.append(anchor);
  });

  const detailTitle=document.querySelector('.detail-title');
  const detailUrl=repoFor(detailTitle?.textContent);
  if(detailUrl&&!document.querySelector('.detail-repo-link')){
    const a=document.createElement('a');
    a.className='detail-link detail-repo-link';
    a.href=detailUrl;
    a.target='_blank';
    a.rel='noopener';
    a.textContent='GitHub repository ↗';
    const meta=document.querySelector('.detail-meta');
    if(meta)meta.insertAdjacentElement('afterend',a);
    else detailTitle?.insertAdjacentElement('afterend',a);
  }
})();

(()=>{
  const main=document.getElementById('main');
  if(!main)return;
  const numbers=main.querySelector('.numbers');
  const order=['about','education','experience','outputs','research','projects','awards','skills'];
  const about=document.getElementById('about');
  if(about)main.appendChild(about);
  if(numbers)main.appendChild(numbers);
  order.slice(1).forEach(id=>{
    const section=document.getElementById(id);
    if(section)main.appendChild(section);
  });

  const titleMap={
    education:'Education',
    experience:'Experience',
    outputs:'Outputs',
    research:'Research',
    projects:'Projects',
    awards:'Awards & Training',
    skills:'Skills'
  };
  Object.entries(titleMap).forEach(([id,label])=>{
    const h2=document.querySelector(`#${id} .section-head h2`);
    if(h2)h2.textContent=label;
  });

  const navItems=[
    ['Education','#education'],
    ['Experience','#experience'],
    ['Outputs','#outputs'],
    ['Research','#research'],
    ['Projects','#projects'],
    ['Awards','#awards'],
    ['Skills','#skills'],
    ['CV','./cv.html']
  ];
  document.querySelectorAll('.navlinks,.mobile-menu').forEach(menu=>{
    menu.innerHTML=navItems.map(([label,href])=>`<a href="${href}">${label}</a>`).join('');
  });
})();

(()=>{
  const projects=[
    {
      title:'Depression Risk Prediction Using KNHANES Data',
      cover:'./assets/media/project-knhanes-cover.webp',
      detail:'../assets/media/project-knhanes-detail.webp'
    },
    {
      title:'AI-Based Hospital Information System for Clinical and Insurance Prediction',
      cover:'./assets/media/project-hospital-cover.webp',
      detail:'../assets/media/project-hospital-detail.webp'
    },
    {
      title:'Proposal for Expanding DRT Service Areas in Gyeonggi Province',
      cover:'./assets/media/project-drt-cover.webp',
      detail:'../assets/media/project-drt-detail.webp'
    },
    {
      title:'Risk-Based Prioritization of Heated Pavement Deployment',
      cover:'./assets/media/project-heated-cover.webp',
      detail:'../assets/media/project-heated-detail.webp'
    }
  ];

  const normalized=text=>(text||'').replace(/\s+/g,' ').trim();

  document.querySelectorAll('.project').forEach(card=>{
    const title=normalized(card.querySelector('h3')?.textContent);
    const item=projects.find(p=>title.includes(p.title));
    const img=card.querySelector('.project-thumb img');
    if(item&&img){
      img.src=item.cover;
      img.removeAttribute('onerror');
    }
  });

  const detailTitle=normalized(document.querySelector('.detail-title')?.textContent);
  const item=projects.find(p=>detailTitle.includes(p.title));
  if(item){
    const figure=document.querySelector('.detail-section .figure');
    const img=figure?.querySelector('img');
    if(figure)figure.dataset.src=item.detail;
    if(img){
      img.src=item.detail;
      img.removeAttribute('onerror');
    }
  }
})();

(()=>{
  const norm=s=>(s||'').replace(/\s+/g,' ').trim();
  const about=document.getElementById('about');

  if(about){
    const profile=about.querySelector('.profile');
    if(profile)profile.src='./assets/media/profile.webp';

    const intro=about.querySelector('.intro');
    if(intro){
      intro.innerHTML='아주대학교 산업공학과에서 머신러닝과 데이터 분석을 공부하며, <strong>일상에서 생성되는 건강 데이터와 의료영상으로 환자 상태를 예측하고 변화 신호를 포착하는 의료 AI</strong>를 연구해왔습니다. 현재는 passive smartphone sensing만을 이용한 PHQ-9 기반 우울 심각도 예측과 개인별 행동 이상이 이후 PHQ-9 변화에 선행하는지 분석하고 있으며, 이전에는 환자 촬영 장루 영상의 분류와 data-efficient lesion localization을 연구했습니다.';
    }

    const quote=about.querySelector('blockquote');
    if(quote){
      quote.textContent='“환자 개인별 종단적 건강 상태 변화를 감지하고, 이를 이용해 원격 진료를 할 수 있는 의료 AI를 개발하는 연구자가 되고자 합니다.”';
    }

    const tags=about.querySelectorAll('.tags span');
    if(tags[2])tags[2].textContent='Time-Series & Longitudinal Data';
  }

  const collab='Industry–Academia–Hospital Collaborative Research · Ajou University Hospital';

  document.querySelectorAll('.research').forEach(card=>{
    const title=norm(card.querySelector('h3')?.textContent);
    const badgeHost=card.querySelector('.row > div > div')||card.querySelector('.row > div');

    if(title.includes('Data-Efficient Stoma Lesion Localization')||title.includes('Deep Learning-Based Stoma Image Classification')){
      if(badgeHost&&!Array.from(badgeHost.querySelectorAll('.badge')).some(b=>b.textContent.includes('Industry–Academia–Hospital'))){
        const badge=document.createElement('span');
        badge.className='badge';
        badge.textContent=collab;
        badgeHost.appendChild(badge);
      }
    }

    if(title.includes('Data-Efficient Stoma Lesion Localization')){
      const resultP=[...card.querySelectorAll('p')].find(p=>p.querySelector('b')?.textContent.trim()==='Results');
      if(resultP&&!resultP.textContent.includes('Dice score')){
        resultP.innerHTML=resultP.innerHTML.replace(/,\s*Dice\s*<strong>/,', Dice score <strong>');
      }
    }

    if(title.includes('Digital Phenotype-Based Mental Health Prediction')){
      if(badgeHost&&!Array.from(badgeHost.querySelectorAll('.badge')).some(b=>b.textContent.includes('23rd Avison'))){
        const badge=document.createElement('span');
        badge.className='badge';
        badge.textContent='23rd Avison Biomedical Symposium 2026';
        badgeHost.appendChild(badge);
      }

      const figure=card.querySelector('.figure');
      const img=figure?.querySelector('img');
      const src='./assets/media/research-digital-health-cover.webp';
      if(figure){
        figure.dataset.src=src;
        figure.dataset.caption='Yongin Severance Hospital Digital Healthcare Hackathon';
      }
      if(img){
        img.src=src;
        img.alt='Yongin Severance Hospital Digital Healthcare Hackathon cover';
      }
    }
  });

  const detailTitle=norm(document.querySelector('.detail-title')?.textContent);
  if(detailTitle.includes('Digital Phenotype-Based Mental Health Prediction and Derived Feature Contribution Analysis')){
    const figures=[...document.querySelectorAll('.gallery figure')];
    const presentationFigure=figures[1];
    if(presentationFigure){
      const button=presentationFigure.querySelector('.figure');
      const img=button?.querySelector('img');
      const caption=presentationFigure.querySelector('figcaption');
      const src='../assets/media/avison-presentation.webp';

      if(button){
        button.dataset.src=src;
        button.dataset.caption='Junha Won presenting at the 23rd Avison Biomedical Symposium 2026';
      }
      if(img){
        img.src=src;
        img.alt='Junha Won presenting at the 23rd Avison Biomedical Symposium 2026';
      }
      if(caption)caption.textContent='23rd Avison Biomedical Symposium 2026 발표 현장';
    }
  }
})();
