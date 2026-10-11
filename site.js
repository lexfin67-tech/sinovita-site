// SinoVita: копирование email и отправка формы заявки на /api/lead (Cloudflare Pages Function → Telegram + журнал).
(function(){
  function t(k,d){try{var l=(new URLSearchParams(location.search).get('lang'))||localStorage.getItem('sv_lang')||'en';return (window.T&&T[l]&&T[l][k])||d}catch(e){return d}}
  document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var v=b.getAttribute('data-copy');
    (navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).catch(function(){}).finally(function(){b.classList.add('ok');setTimeout(function(){b.classList.remove('ok')},1500)})})});
  function goal(n){try{if(window.ym&&window.YM_ID)ym(window.YM_ID,'reachGoal',n)}catch(e){}}
  document.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'';
    if(h.indexOf('mailto:')===0)goal('click_email');else if(h.indexOf('t.me/')>=0)goal('click_tg');else if(h.indexOf('wa.me/')>=0)goal('click_wa')});
  var f=document.getElementById('inquiry');if(!f)return;
  f.addEventListener('submit',function(e){e.preventDefault();var btn=f.querySelector('[type=submit]'),msg=f.querySelector('.form-msg');
    if(f.website&&f.website.value)return;
    var d={site:'SinoVita',page:location.pathname,lang:(new URLSearchParams(location.search).get('lang'))||'en'};new FormData(f).forEach(function(v,k){d[k]=v});
    btn.disabled=true;
    fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).then(function(r){if(!r.ok)throw 0;
      msg.style.color='#2e7d4f';msg.textContent=t('form-ok','Thank you! Your inquiry has been sent.');f.reset();
      try{if(window.ym&&window.YM_ID)ym(window.YM_ID,'reachGoal','brief_submit')}catch(_){}
    }).catch(function(){msg.style.color='#C8181E';msg.textContent=t('form-err','Could not send. Please email sales@sinovita-ingredients.com.')}).finally(function(){btn.disabled=false;msg.style.display='block'});
  });
})();
