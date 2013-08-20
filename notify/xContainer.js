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

/*	
    renderTpl: [
	   '<tpl if="showTitle"> <div class="{baseCls}-header">{title}</div> </tpl>',
	   '<div class="{baseCls}-content"></div>',
	   '<p class="{baseCls}-text"> Descr</p>',
	   '<tpl if="closable"><div class="{baseCls}-close" aria-hidden="true" data-icon="E"></div></tpl>',
       '{%this.renderContainer(out,values)%}',
    ],
*/
    renderTpl: [
	   '<div class="{baseCls}-tool" aria-hidden="true" data-icon="e"></div>',
	   '<div class="{baseCls}-header">{title}</div>',
       '{%this.renderContainer(out,values)%}',

    ],
	
    initComponent: function() {
	  var me = this;
	  var ctStyle='';
	  
	  me.callParent();
	  floating  = true;
	  shadow    = false;
      me.addEvents('close');
	  
	  if (me.ui==='dark'){
	     ctStyle = ctStyle + " background: rgba(8,8,8,0.60); color: rgba(222, 222, 222, 0.9); ";
	  }
	  else{
	     ctStyle = ctStyle + " background: rgba(240, 240, 240, 0.60);  color: rgba(8, 8, 8, 0.9); ";
	  }
	  
	  if (me.roundedCorners==true){ctStyle = ctStyle + " border-radius:5px; ";}
	  //me.style = ctStyle;

 	  //console.log('init comp');
	  

	  },

    initRenderData: function() {
        var me = this;

        return Ext.apply(me.callParent(), {
            title     : me.title,
			showTitle : ((me.title=='')?false:true) ,
            descr     : me.descr,
			closable  : me.closable,
			imgBgStyle: me.ui==='dark'?' rgba(0, 0, 0, 0.3); ':' rgba(222, 222, 222, 0.3); ', 
			glyph     : me.glyph,
			glyphColor: me.glyphColor,
			showIcon  : me.showIcon,
			showOkBtn : me.showOkBtn,
			showYesBtn: me.showYesBtn,
			showNoBtn : me.showNoBtn,
			borderRadius  :me.roundedCorners?'5px 0 0 5px':'0px',
			showCancelBtn :me.showCamncelBtn
			
		});

    },

	
	
    onRender : function() {
        var me = this;

        me.callParent(arguments);
		el = me.el;
        if (!me.titleEl && me.title != '')   {me.titleEl = me.el.down('.' + me.baseCls + '-title');}else{me.showTitle = false;}
		if (!me.descrEl)   {me.descrEl = me.el.down('.' + me.baseCls + '-descr');}
		if (!me.closeEl && me.closable)   {me.closeEl = me.el.down('.' + me.baseCls + '-close');}
	},

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
		
		if (me.closable){
			me.mon(me.closeEl, 'click', function() {
				this.close();
			}, me);
		}
		
		if (me.showOkBtn || me.showYesBtn || me.showNoBtn || me.showCancelBtn) {
			me.mon(me.el.down('.' + me.baseCls + '-ok-btn'), 'click', function() {
				this.close();
			}, me);

			me.mon(me.el.down('.' + me.baseCls + '-yes-btn'), 'click', function() {
				this.close();
			}, me);

			me.mon(me.el.down('.' + me.baseCls + '-no-btn'), 'click', function() {
				this.close();
			}, me);

			me.mon(me.el.down('.' + me.baseCls + '-cancel-btn'), 'click', function() {
				this.close();
			}, me);
		}
		
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
    }
});
