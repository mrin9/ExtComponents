Ext.define('Ext.nContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.nContainer',

    requires: [
        'Ext.Template',
        'Ext.CompositeElement',
    ],

   /**
    * @cfg {String} [baseCls='x-xContainer']
    */
    baseCls: Ext.baseCSSPrefix + 'xContainer',
	componentCls:'',
    title     :'',
	descr     :'',
	iconSrc   :'',
	//draggable :true,
    showIcon  :true,
	closable  :true,  
	showOkBtn    :false,
	showYesBtn   :false,
	showNoBtn    :false,
	showCancelBtn:false,
	closeAction:'destroy',
	roundedCorners:true,
	glyph      :'T',
	glyphColor :'hsl(80, 70%, 55%)',
	ui         :'dark',
	
	slideInAnimation: 'easeIn',

    renderTpl: [
	   '<div id="{id}-headerEl">', // {id}-header will ensure that you can access the childEls config 
	      '<tpl for="tools">',
	         '<div class="{parent.baseCls}-tool" aria-hidden="true" data-icon="{glyph}" data-index="{#}"></div>',
	      '</tpl>',
	      '<div class="{baseCls}-header">{title}</div>',
	   '<div>',
       '{%this.renderContainer(out,values)%}',
    ],

	childEls: ["headerEl"],
	
    initComponent: function() {
	  var me = this;
	  var ctStyle='';
	  me.callParent();
	  if 	(me.ui==='dark'){ctStyle = ctStyle + " background: rgba(8,8,8,0.60); color: rgba(222, 222, 222, 0.9); ";}
	  else	{ctStyle = ctStyle + " background: rgba(240, 240, 240, 0.60);  color: rgba(8, 8, 8, 0.9); ";}
	  me.style = ctStyle;
	},

    initRenderData: function() {
        var me = this;
        return Ext.apply(me.callParent(), {
            title     : me.title,
			imgBgStyle: me.ui==='dark'?' rgba(0, 0, 0, 0.3); ':' rgba(222, 222, 222, 0.3); ', 
			tools     : me.tools
		});
    },

	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
		console.log(me.headerEl);
		me.mon(me.headerEl, 'click', me._click, me);
		
	},
	
    setTitle: function(text) {
        var me = this;
        me.title = text;
        if (me.rendered && me.showTitle) {
            me.titleEl.update(me.title);
        }
        return me;
    },

    setDescr: function(text) {
        var me = this;
        me.descr = text;
        if (me.rendered) {
            me.descrEl.update(me.descr);
        }
        return me;
    },

    applyText : function(text) {
        this.setContent(text);
    },
    
    getTitle: function(){return this.title;},
	getDescr: function(){return this.descr;},


    close: function() {
		var me = this;
		if(me.closeAction ==='destroy'){
           me.destroy();
		}
		else{
		   me.hide();
		}	
	    
    },
	
    onDestroy: function(){
        var me = this;
        if (me.rendered) {
            if (me.descrEl.isComposite) { me.descrEl.clear();}
            if (me.showTitle && me.titleEl.isComposite) { me.titleEl.clear();}
            Ext.destroyMembers(me, 'descrEl','titleEl','closeEl');
        }
        me.callParent();
    },
	
	_click: function(e, o)
    {   var me = this;
        var toolIndex = o.getAttribute('data-index');
		if (toolIndex){
			me.tools[toolIndex-1].handler.call(me);
			me.fireEvent('toolClick', toolIndex);
		}
    },
	
});
