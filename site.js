(function(){
  var hd=document.getElementById('hd'), burger=document.getElementById('burger');
  function onScroll(){ hd.classList.toggle('solid', window.scrollY>40); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  burger.addEventListener('click', function(){
    var open=hd.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open?'메뉴 닫기':'메뉴 열기');
  });

  var slides=[].slice.call(document.querySelectorAll('.slide'));
  if(slides.length>1){
    var i=0, count=document.getElementById('count'), timer;
    var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(n){
      slides[i].classList.remove('on');
      i=(n+slides.length)%slides.length;
      slides[i].classList.add('on');
      count.textContent=(i+1)+' / '+slides.length;
    }
    function auto(){ clearInterval(timer); if(!still) timer=setInterval(function(){show(i+1);}, 6000); }
    document.getElementById('prev').addEventListener('click', function(){show(i-1);auto();});
    document.getElementById('next').addEventListener('click', function(){show(i+1);auto();});
    auto();
  }

  var form=document.getElementById('rfq');
  if(form){
    var item=new URLSearchParams(location.search).get('item');
    if(item){ [].forEach.call(form.item.options, function(o){ if(o.text===item) o.selected=true; }); }
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var f=form, err=document.getElementById('err');
      if(!f.name.value.trim()||!(f.phone.value.trim()||f.email.value.trim())||!f.detail.value.trim()){ err.hidden=false; err.scrollIntoView({block:'center'}); return; }
      err.hidden=true;
      var lines=['회사명: '+f.company.value,'담당자: '+f.name.value,'전화: '+f.phone.value,'이메일: '+f.email.value,
        '품목군: '+f.item.value,'희망 납기: '+f.due.value,'','[형번·수량]',f.detail.value];
      var subject='[견적문의] '+(f.company.value||f.name.value);
      location.href='mailto:jjyy6625@hanmail.net?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
    });
  }
})();
