import techIcon from './helpers/techIconSwitch';
import stringFormat from './helpers/stringFormat';
import {latlngOptions} from './helpers/Options';
import './googleMap.css'

  const createHTMLMapMarker = (history) =>{

    function CustomMarker(item, map, initParams) {
      this.latlng = new global.google.maps.LatLng(item.lat, item.lng);		
      this.offers = item.offerts
      this.setMap(map);	
      this.initParams = initParams;
      this.place_id = item.place_id
    }
    
    CustomMarker.prototype = new global.google.maps.OverlayView();

    CustomMarker.prototype.urlPush = function(slug){
      history.push(`/offer/${slug}`)
    }
    
    CustomMarker.prototype.activeMarker = function(tech){
      
      if(!this.pointer){
        this.withActiveMarker=true
      }
      else{
        this.pointer.classList.add('active_marker')
        this.pointer.style.backgroundImage=`url(${techIcon(tech)})`;
      }
      this.map.setCenter(this.latlng)
      this.map.setZoom(12)
    }

    CustomMarker.prototype.deactiveMarker = function(){
      this.pointer.classList.remove('active_marker')
    }

    CustomMarker.prototype.onLabelActiveMapRemove = function(){
      const mapRect = document.getElementById('map').getBoundingClientRect()
      const tooltipRect = this.tooltip.getBoundingClientRect()

      const space = 10

      let vertical = 0
      let horizontal = 0

      if(mapRect.left+space-tooltipRect.left > 0 ){
        horizontal = mapRect.left+space-tooltipRect.left
      }
      if(mapRect.right-space-tooltipRect.right < 0 ){
        horizontal = mapRect.right-space-tooltipRect.right
      }
      if(mapRect.top+space-tooltipRect.top > 0 ){
        vertical = mapRect.top+space-tooltipRect.top
      }

      if(vertical+horizontal){
        var point = new global.google.maps.LatLng(this.map.getCenter().lat(), this.map.getCenter().lng())
        var pixelpoint = this.projection.fromLatLngToDivPixel(point);
        pixelpoint.x -= horizontal
        pixelpoint.y -= vertical
        point = this.projection.fromDivPixelToLatLng(pixelpoint)
        this.map.panTo(point);
      }
    }

    CustomMarker.prototype.filterOffers = function(list, params){
        const {location, tech, exp_lvl, from, to, sort} = params
        
        return list.filter(item => (
          (location ? stringFormat(item.city)===location : true) && 
          (tech ? (item.tech===tech) : true) && 
          (exp_lvl ? (item.exp_lvl===exp_lvl) : true) &&
          (from ? (item.salary_from >= from) : true) &&
          (to ? (item.salary_to <= to) : true)
        )).sort((a,b)=>{
          switch(sort){
            case 'sal-down':
              return (a.salary_from > b.salary_from) ? 1 : (a.salary_from === b.salary_from) ? ((a.salary_to > b.salary_to) ? 1 : -1) : -1 
            case 'sal-up':
              return (a.salary_to < b.salary_to) ? 1 : (a.salary_to === b.salary_to) ? ((a.salary_from < b.salary_from) ? 1 : -1) : -1 
            default:
              return (a.date_add < b.date_add) ? 1 : -1
          }
        })
    }  
    
    CustomMarker.prototype.update = function(params){

      let arrayLength = 0

      this.tooltip_inner.innerHTML = ''

      this.filterOffers(this.offers, params).forEach((item, index)=>{

        if(!item[index+1]){
          this.pointer.style.backgroundImage=`url(${techIcon(item.tech)})`;
        }

        this.singleOfferSlug = item.slug

        this.tooltip_inner.appendChild(item.htmlEl)

        arrayLength++
      })

      if(params.location){
        this.map.setCenter(new global.google.maps.LatLng(latlngOptions[params.location][0], latlngOptions[params.location][1]) )
        this.map.setZoom(11)
      }
      else{
        this.map.setCenter(new global.google.maps.LatLng(latlngOptions.poland[0], latlngOptions.poland[1]) )
        this.map.setZoom(6)
      }

      this.currentLength = arrayLength

      if(!arrayLength){
        this.pointer.style.display = 'none'
        this.tooltip.style.display = 'none'
      }
      
      if(arrayLength){
        
        this.pointer.innerHTML = arrayLength >1 ? `<span class='marker_span'>${arrayLength}</span>` : ''

        this.pointer.style.display = 'block';
        this.tooltip.style.display = 'none';
      }
  
    } 

    CustomMarker.prototype.draw = function() {
      
      var self = this;
      var pointer = this.pointer;
      var tooltip = this.tooltip;
      var tooltip_inner = this.tooltip_inner;
      
      if (!pointer) {
        
        //pointer
        pointer = this.pointer = document.createElement('div');
        pointer.className = 'marker';
        pointer.id = this.place_id
        
        if(this.withActiveMarker){
          pointer.classList.add('active_marker')
        }
        
        //tooltip
        tooltip = this.tooltip = document.createElement('div');
        tooltip.className = 'tooltip_container';
        tooltip.style.display = 'none'
        
        //tooltip_inner
        tooltip_inner = this.tooltip_inner = document.createElement('div');
        tooltip.appendChild(this.tooltip_inner)
        tooltip_inner.className = 'tooltip_inner';
        
        //creating all offers html elements
        this.offers.forEach(item=>{
          const htmlEl = document.createElement('div')
          htmlEl.className = 'tooltip_item_container'
          htmlEl.onclick = () => {
              this.urlPush(item.slug)
          }
          htmlEl.innerHTML =  `<div class='logo_wrapper'>
                                  <img class='logo' src=${'http://127.0.0.1:8000'+item.image}/>
                                </div>
                                <div class='item_info_container'>
                                  <span class='item_info_name'>${item.offer_title}</span>
                                  <span class='item_info_salary'>${item.salary_from+' - '+item.salary_to} PLN</span>
                                  <span class='item_info_name'>${item.company_name}</span>
                                </div>`  
          item.htmlEl = htmlEl
        })

        this.update(this.initParams)

        //click handler
        const clickHandler = (e)=>{
          if(!tooltip.contains(e.target)){
            document.getElementById('map').removeEventListener('click', clickHandler, true)

            if(!pointer.contains(e.target)){
              tooltip.style.display = 'none'
            }
          }
        }

        // event listeners
        global.google.maps.event.addDomListener(pointer, "click", (event)=> {
          if(this.currentLength>1){

              if(tooltip.style.display==='block'){
                tooltip.style.display='none'
              }
              else{
                tooltip.style.display='block'
                this.onLabelActiveMapRemove()
              }

              
              document.getElementById('map').addEventListener('click', clickHandler, true)    
          }
          else if(this.currentLength===1){
            this.urlPush(this.singleOfferSlug)
          }
          global.google.maps.event.trigger(self, "click");
        });

        global.google.maps.event.addDomListener(pointer, "mouseover", (event)=> {
          if(this.currentLength===1){
            tooltip.style.display = 'block';
            this.onLabelActiveMapRemove()
            tooltip.classList.add('zindex_high')
            pointer.classList.add('zindex_high')
          }
          global.google.maps.event.trigger(self, "mouseover");
        });
        
        global.google.maps.event.addDomListener(pointer, "mouseout", (event)=> {
        
          if(this.currentLength===1){
            tooltip.style.display= 'none';
            tooltip.classList.remove('zindex_high')
            pointer.classList.remove('zindex_high')
            
          }
          global.google.maps.event.trigger(self, "mouseout");
        });

        //add to map
        var panes = this.getPanes();
        panes.overlayImage.appendChild(pointer);
        panes.overlayImage.appendChild(tooltip);
      }
      
      var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      
      if (point) {
        pointer.style.left = (point.x - 20) + 'px';
        pointer.style.top = (point.y - 20) + 'px';

        tooltip.style.left = (point.x-113) + 'px';
        tooltip.style.top = (point.y-17) + 'px';
      }
    };
    
    CustomMarker.prototype.remove = function() {
      if (this.pointer) {
        this.pointer.parentNode.removeChild(this.pointer);
        this.pointer = null;
      }	
    };
    
    CustomMarker.prototype.getPosition = function() {
      return this.latlng;	
    };
  
    return CustomMarker
  }
  export default createHTMLMapMarker;
