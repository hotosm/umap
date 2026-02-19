(function(e,s){typeof exports=="object"&&typeof module<"u"?module.exports=s(require("lit"),require("lit/decorators.js")):typeof define=="function"&&define.amd?define(["lit","lit/decorators.js"],s):(e=typeof globalThis<"u"?globalThis:e||self,e.HotToolMenu=s(e.Lit,e.LitDecorators))})(this,(function(e,s){"use strict";const g=e.unsafeCSS("@import url('https://cdn.jsdelivr.net/npm/@hotosm/ui-design@latest/dist/hot.css');"),m=e.css`
  ${g}

  :host {
    display: inline-block;
    position: relative;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-trigger {
    background: none;
    border: none;
    padding: var(--icon-padding, var(--hot-spacing-small));
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--hover-border-radius, 4px);
    transition: background-color 0.2s ease;
  }

  .dropdown-trigger:hover {
    background-color: var(--hover-bg, var(--hot-color-gray-50));
  }

  .dropdown-trigger:focus {
    outline: none;
  }

  .dropdown-trigger:active {
    outline: none;
  }

  .menu-icon {
    width: var(--icon-size, 20px);
    height: var(--icon-size, 20px);
    display: block;
    margin: var(--icon-margin, 0);
    color: var(--icon-color, --hot-color-gray-800);
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid var(--hot-color-neutral-200, #e5e5e5);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 250px;
    max-width: 320px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease,
      transform 0.2s ease;
  }

  .dropdown-content.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--hot-spacing-x-small) var(--hot-spacing-medium);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease;
    gap: var(--hot-spacing-small);
  }

  .dropdown-item:hover {
    background-color: var(--hot-color-neutral-50, #f8f9fa);
  }

  .dropdown-item:focus {
    background-color: var(--hot-color-neutral-50, #f8f9fa);
    outline: 2px solid var(--hot-color-primary-500, #0066cc);
    outline-offset: -2px;
  }

  .tool-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;
  }

  .tool-content {
    display: flex;
    flex-direction: column;
    gap: var(--hot-spacing-2x-small);
    text-align: left;
    flex: 1;
  }

  .tool-title {
    font-weight: var(--hot-font-weight-light, 300);
    font-size: var(--hot-font-size-small, 14px);
    color: var(--hot-color-neutral-950, #1a1a1a);
    line-height: 1.3;
  }

  .section-label {
    font-weight: var(--hot-font-weight-bold);
    font-size: var(--hot-font-size-small, 14px);
    padding: var(--hot-spacing-x-small) var(--hot-spacing-medium)
      var(--hot-spacing-2x-small) var(--hot-spacing-medium);
    color: var(--hot-color-gray-900);
  }

  .section-divider {
    border-top: 1px solid var(--hot-color-neutral-200, #e5e5e5);
    margin-top: var(--hot-spacing-x-small);
    padding-top: var(--hot-spacing-x-small);
  }

  .section-group:first-child .section-label {
    padding-top: var(--hot-spacing-small);
  }

  .section-group:last-child .dropdown-item:last-child {
    padding-bottom: var(--hot-spacing-small);
  }
`,r={en:{imagery:"Imagery",mapping:"Mapping",field:"Field",data:"Data"},es:{imagery:"Imágenes",mapping:"Mapeo",field:"Campo",data:"Datos"},fr:{imagery:"Imagerie",mapping:"Cartographie",field:"Terrain",data:"Données"},pt:{imagery:"Imagens",mapping:"Mapeamento",field:"Campo",data:"Dados"}},v="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e",w="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e",f="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e",u="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e",x="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e",b="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e",y="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e",k="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'%3e%3crect%20width='1'%20height='1'%20fill='white'/%3e%3c/svg%3e";var T=Object.defineProperty,l=(d,t,i,n)=>{for(var o=void 0,c=d.length-1,p;c>=0;c--)(p=d[c])&&(o=p(t,i,o)||o);return o&&T(t,i,o),o};const C=[{id:"imagery"},{id:"mapping"},{id:"field"},{id:"data"}],O=[{id:"drone",title:"Drone Tasking Manager",href:"https://dronetm.org/",icon:v,section:"imagery"},{id:"oam",title:"OpenAerialMap",href:"https://openaerialmap.org/",icon:w,section:"imagery"},{id:"tasking-manager",title:"Tasking Manager",href:"https://tasks.hotosm.org/",icon:f,section:"mapping"},{id:"fair",title:"fAIr",href:"https://fair.hotosm.org/",icon:u,section:"mapping"},{id:"field",title:"Field Tasking Manager",href:"https://fmtm.hotosm.org/",icon:x,section:"field"},{id:"chat-map",title:"ChatMap",href:"https://chatmap.hotosm.org",icon:b,section:"field"},{id:"export-tool",title:"Export Tool",href:"https://export.hotosm.org/",icon:y,section:"data"},{id:"umap",title:"uMap",href:"https://umap.hotosm.org/",icon:k,section:"data"}],h=class h extends e.LitElement{constructor(){super(...arguments),this.showLogos=!1,this.lang="en",this.isOpen=!1,this.tools=O,this.handleOutsideClick=t=>{this.contains(t.target)||this.closeDropdown()}}t(t){return(r[this.lang]||r.en)[t]||r.en[t]||t}getToolHref(t){return window.location.hostname.endsWith(".test")&&{drone:"https://dronetm.hotosm.test",oam:"https://openaerialmap.hotosm.test","tasking-manager":"https://login.hotosm.test",fair:"https://fair.hotosm.test",field:"https://login.hotosm.test","chat-map":"https://chatmap.hotosm.test","export-tool":"https://login.hotosm.test",umap:"https://umap.hotosm.test"}[t.id]||t.href}getToolsBySection(t){return this.tools.filter(i=>i.section===t)}toggleDropdown(){this.isOpen=!this.isOpen,this.isOpen?setTimeout(()=>{document.addEventListener("click",this.handleOutsideClick)},0):document.removeEventListener("click",this.handleOutsideClick)}closeDropdown(){this.isOpen=!1,document.removeEventListener("click",this.handleOutsideClick)}handleToolClick(t){this.dispatchEvent(new CustomEvent("tool-selected",{detail:{tool:t},bubbles:!0,composed:!0}));const i=this.getToolHref(t);window.open(i,"_blank","noopener,noreferrer"),this.closeDropdown()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleOutsideClick)}render(){return e.html`
      <div class="dropdown">
        <button
          class="dropdown-trigger"
          @click=${this.toggleDropdown}
          aria-label="Open tools menu"
          aria-expanded=${this.isOpen}
          aria-haspopup="true"
        >
          <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
          </svg>
        </button>

        <div class="dropdown-content ${this.isOpen?"open":""}">
          ${C.map((t,i)=>{const n=this.getToolsBySection(t.id);return n.length===0?"":e.html`
              <div
                class="section-group ${i>0?"section-divider":""}"
              >
                <div class="section-label">${this.t(t.id)}</div>
                ${n.map(o=>e.html`
                    <button
                      class="dropdown-item"
                      @click=${()=>this.handleToolClick(o)}
                    >
                      ${this.showLogos?e.html`<img
                            class="tool-icon"
                            src="${o.icon}"
                            alt="${o.title}"
                          />`:""}
                      <div class="tool-content">
                        <div class="tool-title">${o.title}</div>
                      </div>
                    </button>
                  `)}
              </div>
            `})}
        </div>
      </div>
    `}};h.styles=m;let a=h;return l([s.property({type:Boolean,attribute:"show-logos",reflect:!1})],a.prototype,"showLogos"),l([s.property({type:String})],a.prototype,"lang"),l([s.state()],a.prototype,"isOpen"),customElements.define("hotosm-tool-menu",a),a}));
