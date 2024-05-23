const loadAdOld = function() {
    const { _bsa } = window as any;
    if(typeof _bsa !== 'undefined' && _bsa) {
      _bsa.init('custom', 'CK7I62QJ', 'placement:grapesjscom', {
        target: '#native-carbon',
        template: '<div id="carbonads">' +
            '<a class="carbon-link" href="##link##" target="_blank" rel="noopener">'+
              '<span class="carbon-wrap">'+
                '<span class="carbon-img">'+
                  '<img src="##logo##" alt="" border="0" style="max-width: 130px; padding: 10px; background-color: ##backgroundColor##">'+
                '</span>'+
                '<span class="carbon-text">##description##</span>'+
                '<div class="carbon-cta-c">'+
                  '<span class="carbon-cta" style="background-color: ##ctaBackgroundColor##; color: ##ctaTextColor##">##callToAction##</span>'+
                '</div>'+
              '</span>'+
            '</a>'+
          '</div>',
      });
    }
  };

  let loadStarted = false;

  const loadScript = function(src: string, clb?: () => void) {
    const scr = document.createElement('script');
    scr.src = src;
    clb && (scr.onload = clb);
    document.head.appendChild(scr);
    return scr;
  };

  const loadNativeCarbon = () => {
    if (loadStarted) return;
    const script = loadScript('https://cdn.carbonads.com/carbon.js?serve=CEAIVK77&placement=grapesjscom');
    script.setAttribute('id', '_carbonads_js');
    const adCont = document.getElementById('native-carbon');
    adCont?.appendChild(script);
    loadStarted = true;
  }

  function BSANativeCallbackOld (a: any) {
    const total = a.ads.length;
    !total && loadNativeCarbon()
  }

  export const initCarbon = () => {
    if (['grapesjs.com', 'localhost'].indexOf(location.hostname) >= 0 ) {
        loadNativeCarbon();
    }
  }
