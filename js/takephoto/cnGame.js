
(function(win,undefined){
	
	var _cnGame={
		
		init:function(id,options){
			this.canvas = this.core.$(id);	
			this.context = this.canvas.getContext('2d'); 
			this.width = options.width;
			this.height = options.height;
			this.canvas.width=this.width;
			this.canvas.height=this.height;
	
		},
		/**
		 * add member
		**/
		register:function(nameSpace,func){
			var nsArr=nameSpace.split(".");
			var parent=win;
			for(var i=0,len=nsArr.length;i<len;i++){
				(typeof parent[nsArr[i]]=='undefined')&&(parent[nsArr[i]]={});
				parent=parent[nsArr[i]];
			}
			if(func){
				func.call(parent,this);	
			}
			return parent;
		},
		/**
		 *
		**/
		clean:function(){
			this.context.clearRect(this.width,this.height);
		}		
	};
			  	  	  
	win["cnGame"]=_cnGame;		  
		  


	cnGame.register("cnGame.core",function(cg){ //win["cnGame"] cnGame["core"]
		
		/**
		 * getElementById
		**/
		this.$=function(id){
			return document.getElementById(id);		
		};
		/**
		* getElementsByTagName
		**/
		this.$$=function(tagName,parent){
			parent=parent||document;
			return parent.getElementsByTagName(tagName);	
		};
		
		/**
		 * addEventListener
		**/
		this.bindHandler=(function(){
							
						if(window.addEventListener){
							return function(elem,type,handler){
								elem.addEventListener(type,handler,false);
								
							};
						}
						else if(window.attachEvent){
							return function(elem,type,handler){
								elem.attachEvent("on"+type,handler);
							};
						}
		})();
		/**
		 *
		**/
		this.removeHandler=(function(){
						if(window.removeEventListerner){
							return function(elem,type,handler){
								elem.removeEventListerner(type,handler,false);
								
							};
						}
						else if(window.detachEvent){
							return function(elem,type,handler){
								elem.detachEvent("on"+type,handler);
							};
						}
		})();
		
		this.isUndefined=function(elem){
			return typeof elem==='undefined';
		},
		/**
		 *
		**/
		this.isArray=function(elem){
			return Object.prototype.toString.call(elem)==="[object Array]";
		};
		/**
		 * 
		**/
		this.isObject=function(elem){
			return elem===Object(elem);
		};
		/**
		 *
		**/
		this.isString=function(elem){
			return Object.prototype.toString.call(elem)==="[object String]";
		};
		/**
		 *
		**/
		this.isNum=function(elem){
			return Object.prototype.toString.call(elem)==="[object Number]";
		};
		/**
		 * 
		**/
		this.extend=function(destination,source,isCover){
			var isUndefined=this.isUndefined;
			(isUndefined(isCover))&&(isCover=true);
			for(var name in source){
				if(isCover||isUndefined(destination[name])){
					destination[name]=source[name];
				}
			
			}
			return destination;
		};
	
});

/**
 *resourceLoad
 * loader
 *
**/
cnGame.register("cnGame",function(cg){
	
	var file_type = {};
 	file_type["json"] = "json";
 	file_type["wav"] = "audio";
 	file_type["mp3"] = "audio";
	file_type["ogg"] = "audio";
 	file_type["png"] = "image";
	file_type["jpg"] = "image";
 	file_type["jpeg"] = "image";
	file_type["gif"] = "image";
	file_type["bmp"] = "image";
	file_type["tiff"] = "image";
	/**
	 * gameObj.initialize
	**/	
	var resourceLoad=function(self,type){
		return function(){
			self.loadedCount+=1;
			type=="image"&&(self.loadedImgs[this.srcPath]=this);				 
			self.loadedPercent=Math.floor(self.loadedCount/self.sum*100);
			if(self.loadedPercent===100){
			
				self.loadedCount=0;
				self.loadedPercent=0;
				type=="image"&&(self.loadingImgs={});
				if(self.gameObj&&self.gameObj.initialize){
					self.gameObj.initialize();
					if(cg.loop&&!cg.loop.stop){
						cg.loop.end();
					}
					cg.loop=new cg.GameLoop(self.gameObj); 
					cg.loop.start();
				}	
			}
		};
	};
	
	/**
	 * loader
	**/	
	var loader={
		sum:0,			 
		loadedCount:0,	 
		loadingImgs:{},  
		loadedImgs:{},	 
		loadingAudios:{}, 
		loadedAudios:{}, 
		/**
		 * 
		**/	
		start:function(gameObj,options){//options:srcArray,onload
			var srcArr=options.srcArray;
			this.gameObj=gameObj;
		
			if(cg.core.isArray(srcArr)){ //[object Array]
				this.sum=srcArr.length;
				for(var i=0,len=srcArr.length;i<len;i++){
					var path=srcArr[i];
					var suffix=srcArr[i].substring(srcArr[i].lastIndexOf(".")+1);
					var type=file_type[suffix];
					if(type=="image"){		
						this.loadingImgs[path]=new Image();
						cg.core.bindHandler(this.loadingImgs[path],"load",resourceLoad(this,type));
						this.loadingImgs[path].src=path;
						this.loadingImgs[path].srcPath=path;  
					}
				}
					
			}
			
		}
		
	};
	
	
	this.loader=loader;
});


cnGame.register("cnGame",function(cg){

	var timeId=0;
	/**
	 * gameObj.draw
	 *
	**/	
	var gameLoop=function(gameObj,options){
	
		if(!(this instanceof arguments.callee)){
			return new arguments.callee(gameObj,options);
		}
		this.init(gameObj,options);	
	};
	
	gameLoop.prototype={
		/**
		 *  
		**/
		init:function(gameObj,options){
			/**
			 * 
			**/	
			var defaultObj={
				fps:30
			};
			options=options||{};
			
			options=cg.core.extend(defaultObj,options);
			this.gameObj=gameObj;
			this.fps=options.fps;
			interval=1000/this.fps;
			
			this.stop=true;
		},
			
		/**
		 *  
		**/	
		start:function(){
			if(this.stop){		 
				this.stop=false;
				var now=new Date().getTime();
				this.startTime=now;
				this.lastTime=now;
				this.loopDuration=0;	
				if(this.gameObj.draw){
					cg.context.clearRect(0,0,cg.width,cg.height);
					this.gameObj.draw();
					
				}
			}	
		},		
		/**
		 * 
		**/	
		run:function(){
			//this.pause=false;	
		},
		/**
		 * 
		**/	
		pause:function(){
			//this.pause=true;	
		},
		/**
		 * 
		**/	
		end:function(){
			this.stop=true;
			window.clearTimeout(timeId);
		}
		
		
	};
	this.GameLoop=gameLoop;
});

/**
 *
 * Map
 *
**/
cnGame.register("cnGame",function(cg){
							  							  
	var map=function(mapMatrix,options){
		
		if(!(this instanceof arguments.callee)){
			return new arguments.callee(mapMatrix,options);
		}
		this.init(mapMatrix,options);
	};
	map.prototype={
		/**
		 * 
		**/	
		init:function(mapMatrix,options){
			/**
			 * 
			**/	
			var defaultObj={
				cellSize:[1,1],    
				beginX:0,		   
				beginY:0			 
		
			};
			options=options||{};
			options=cg.core.extend(defaultObj,options);  
			this.mapMatrix=mapMatrix;
			this.cellSize=options.cellSize;
			this.beginX=options.beginX;
			this.beginY=options.beginY;
			this.row=mapMatrix.length; //canvas.height
	
				
		},
		/**
		 * 
		**/	
		draw:function(options){ 
			var mapMatrix=this.mapMatrix;
			var beginX=this.beginX;
			var beginY=this.beginY;
			var cellSize=this.cellSize;
			var currentRow;
			var currentCol;
			var currentObj;
			var row=this.row;
			var img;
			for(var i=beginY,ylen=beginY+row*cellSize[1];i<ylen;i+=cellSize[1]){	  
				currentRow=(i-beginY)/cellSize[1];
				for(var j=beginX,xlen=beginX+mapMatrix[currentRow].length*cellSize[0];j<xlen;j+=cellSize[0]){
					currentCol=(j-beginX)/cellSize[0];
					currentObj=options[mapMatrix[currentRow][currentCol]];
					currentObj.x=currentObj.x||0;
					currentObj.y=currentObj.y||0;
					img=cg.loader.loadedImgs[currentObj.src];
					cg.context.drawImage(img,currentObj.x,currentObj.y,cellSize[0],cellSize[1],j,i,cellSize[0],cellSize[1]); 
					
				}
			}
			
			
		},
		/**
		 * 
		**/
		getPosValue:function(x,y){
			if(cg.core.isObject(x)){
				y=x.y;
				x=x.x;
			}
			var isUndefined=cg.core.isUndefined; 
			y=Math.floor(y/this.cellSize[1]); 
			x=Math.floor(x/this.cellSize[0]);
			
			if(!isUndefined(this.mapMatrix[x])&&!isUndefined(this.mapMatrix[x][y])){
				return this.mapMatrix[x][y]; 
			}
			return undefined;
		},
		/**
		 * 
		**/
		getCurrentIndex:function(x,y){
			if(cg.core.isObject(x)){
				y=x.y;
				x=x.x;
			}
			return [Math.floor(x/this.cellSize[0]),Math.floor(y/this.cellSize[1])];
		},
		/**
		 * 
		**/
		isMatchCell:function(x,y){
			if(cg.core.isObject(x)){
				y=x.y;
				x=x.x;
			}
			return (x%this.cellSize[0]==0)&&(y%this.cellSize[1]==0);
		},
		/**
		 * 
		**/
		setPosValue:function(x,y,value){
			this.mapMatrix[y][x]=value;	
		}
		
	};
	this.Map=map;
									   
});

})(window,undefined);

