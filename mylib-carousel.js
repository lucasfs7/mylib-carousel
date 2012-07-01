var API = API || {};
var myLibCarousel;

(function()
{
    myLibCarousel = function(opt)
    {
        /*
         * opt = 
         * {
         *      carouselContainer: [html obj or element id],
         *      carouselListContainer: [html obj or element id],
         *      carouselList: [html obj colection or tag name of items elements],
         *      carouselLeftArrow: [html obj or element id],
         *      carouselRightArrow: [html obj or element id],
         *      carouselEaseEffect: [mylib ease obj],
         *      carouselTransitionTime: [time in ms],
         *      carouselTransitionDistance: [distance from 1 item to another],
         *      carouselTriggerEvent: [event to arrows (click, mouseover)]
         * }
         * */

        //verifica se veio um object ou uma string e instancia o elemento
        var instantiateElem = function(elem)
        {
            if(elem)
            {
                if(typeof(elem).toLowerCase() == "string")
                {
                    return API.getEBI(elem);
                }
                else if(typeof(elem).toLowerCase() == "object")
                {
                    return elem;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        };
        
        //verifica se é um array de objects ou uma string com o nome da tag e retorna a lista com os elementos
        var getListElems = function(elems)
        {
            if(elems)
            {
                if(typeof(elems).toLowerCase() == "object" && elems.length && elems.length > 0)
                {
                    return elems;
                }
                else if(typeof(elems).toLowerCase() == "string")
                {
                    if(listContainer)
                    {
                        return API.getEBTN(elems, listContainer);
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        };
        
        //pega as opções que o usuário passou no objeto opt e declara as vars necessárias para o carousel
        var opt = opt || {};
        var container = instantiateElem(opt.carouselContainer);
        var listContainer = instantiateElem(opt.carouselListContainer);
        var listItems = getListElems(opt.carouselList);
        var leftArrow = instantiateElem(opt.carouselLeftArrow);
        var rightArrow = instantiateElem(opt.carouselRightArrow);
        var easeEffect;

        if(opt.easeEffect)
        {
            easeEffect = opt.easeEffect;
        }
        else
        {
            easeEffect = API.ease.circle;
        }

        var transitionTime = opt.carouselTransitionTime || 1000;
        var transitionDist;
        
        if(opt.carouselTransitionDistance)
        {
            transitionDist = opt.carouselTransitionDistance;
        }
        else if(listItems[0])
        {
            transitionDist = listItems[0].offsetWidth;
        }
        else
        {
            transitionDist = 0;
        }

        var transitionEvent = opt.carouselTriggerEvent || "click";
        var listWidth = transitionDist * listItems.length;
        var containerWidth = container.offsetWidth;
        var transitionInterval;

        listContainer.style.width = listWidth + "px";

        if(leftArrow)
        {
            API.attachListener(leftArrow, transitionEvent, function(e)
            {
                API.cancelDefault(e);
                var animate = function()
                {
                    var carouselPos = listContainer.offsetLeft;
                    var dist = transitionDist;
                    var posAbs = Math.abs(carouselPos);

                    if(carouselPos < 0)
                    {
                        if(posAbs < containerWidth)
                        {
                            dist = posAbs;
                        }
                        
                        API.positionElement(listContainer, 0, (carouselPos + dist), { duration:transitionTime, ease:easeEffect });    
                    }
                    else if(transitionEvent == "mouseover" && transitionInterval)
                    {
                        clearInterval(transitionInterval);
                    }
                };
                
                animate();

                if(transitionEvent == "mouseover")
                {
                    transitionInterval = setInterval(animate, 1000);
                }
            });

            if(transitionEvent == "mouseover")
            {
                API.attachListener(leftArrow, "mouseout", function(e)
                {
                    if(transitionInterval)
                    {
                        clearInterval(transitionInterval);
                    }
                });
            }
        }

        if(rightArrow)
        {
            API.attachListener(rightArrow, transitionEvent, function(e)
            {
                API.cancelDefault(e);
                var animate = function()
                {
                    var carouselPos = listContainer.offsetLeft;
                    var dist = transitionDist;
                    var posAbs = Math.abs(carouselPos);
                    var maxLeft = listWidth - containerWidth;

                    if(posAbs < maxLeft)
                    {
                        if((maxLeft - posAbs) < containerWidth)
                        {
                            dist = (maxLeft - posAbs);
                        }
                        API.positionElement(listContainer, 0, (carouselPos - dist), { duration:transitionTime, ease:easeEffect });
                    }
                    else if(transitionEvent == "mouseover" && transitionInterval)
                    {
                        clearInterval(transitionInterval);
                    }  
                };
                
                animate();

                if(transitionEvent == "mouseover")
                {
                    transitionInterval = setInterval(animate, 1000);
                }                
            });

            if(transitionEvent == "mouseover")
            {
                API.attachListener(rightArrow, "mouseout", function(e)
                {
                    if(transitionInterval)
                    {
                        clearInterval(transitionInterval);
                    }
                });
            }
        }
    };
})();
