let array=[];
let i;
let size=document.querySelector(".myRange").value;//(window.innerWidth-112)/6.5;//
document.querySelector(".myRange").addEventListener("input",function(){
    size=document.querySelector(".myRange").value;

    
    let k=0;
    if(size==50)
    {
        k=20;
        size=size-11;
    }
    else if(size==75)
    {
        k=12.5;
        size=size-16;
    }
    else if(size==100)
    {
        k=9;
        size=size-22;
    }
    else if(size==125)
    {
        k=7;
        size=size-29;
    }
    else if(size==150)
    {
        k=5.5;
        size=size-34;
    }
    else if(size==175)
    { 
        k=4.5;
        size=size-42;
    }
    else if(size==200)
    { 
        k=3.5;
        size=size-43;
    }
    else if(size==225)
    {
        k=3;
        size=size-52;
    }
    document.querySelector(".array-container").innerHTML="";
    //console.log(size);
    reset();
    div();
    show(array);
    let bar=document.querySelectorAll(".array-bar");
    bar.forEach(function(b){
        b.style.width=k+"px";
    })
})

function div()//creating divs for the bars
{
    for(let i=0;i<size;i++)
    {
        var div=document.createElement("div");
        document.querySelector(".array-container").appendChild(div);
        div.className="array-bar";
        div.id="bar"+i;
    }


}

function reset()//initialize the array with new values
{
    const arr=[]
    for(i=0;i<size;i++)
    {
    arr[i]=getRandomFromInterval(5,550);
    }
    array=arr;

}
function show(array)//construct the divs with the element height
{
    
    for(let i=0;i<array.length;i++)   
    {
        var bar=document.querySelector("#bar"+i);
        var height=array[i]+"px";
        bar.style.height=height;
        bar.style.background="red";  
    }
    
}
reset();
div();
show(array);


function getRandomFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);

}

function pixelToNum(str)
{
    return parseInt(str.slice(0,str.length-1));
}

function disable(state)//to disable the toolbar during the execution of the algorithms and re-enable it after completion of the execution 
{
    document.querySelector(".reset").disabled = state;
    document.querySelector(".myRange").disabled=state;
    document.querySelector(".selection-btn").disabled = state;
    document.querySelector(".bubble-btn").disabled = state;
    document.querySelector(".insertion-btn").disabled = state;
    document.querySelector(".quick-btn").disabled = state;
    document.querySelector(".merge-btn").disabled = state;

    
}

document.querySelector(".reset").addEventListener("click",function(){//re-set the array

    reset();
    show(array);
    
});



document.querySelector(".selection-btn").addEventListener("click",function(){//initiate the selection sort algorithm
    
    selectionSort(array); 
});
document.querySelector(".bubble-btn").addEventListener("click",function(){//initiate the bubble sort algorithm
  
    bubbleSort(array);
});

document.querySelector(".insertion-btn").addEventListener("click",function(){//initiate the insertion sort algorithm
    insertionSort(array)
});


document.querySelector(".quick-btn").addEventListener("click",function(){//initiate the quick sort algorithm
    quickSort(0,array.length-1)
    
});

document.querySelector(".merge-btn").addEventListener("click",function(){//initiate the merge sort algorithm

    let auxiliaryarray=array.slice();//helps in getting the DOM bars and uses less memory space
    let animations=[];
    mergeSort(array,0,array.length-1,auxiliaryarray,animations);
    animate(animations);//creates the animation 
    
});

/*Selection Sort*/
function selectionSort(arr)
{
    disable(true);
    let num;
    let i=-1;
    let idt;
    outer();//works as an outer loop
    function  outer()
    {
        i++;
        if(i<array.length)
        {
            num=i;
            let j=i;
            inner();
            function inner()
            {
                j++;
                if(j<arr.length)
                {
                    var a=pixelToNum(document.querySelector("#bar"+j).style.height);
                    var b=pixelToNum(document.querySelector("#bar"+num).style.height);
                    
                    if(a<b)
                    {
                        num=j;
                    }
                    setTimeout(inner,0.01)

                }
                else
                {
                    let temp = document.querySelector("#bar"+i).style.height;
                    document.querySelector("#bar"+i).style.height=document.querySelector("#bar"+num).style.height;
                    document.querySelector("#bar"+num).style.height=temp;
                    document.querySelector("#bar"+i).style.background="blue";
                    for(let k=0;k<i;k++)
                    {
                        document.querySelector("#bar"+k).style.background="red";
                    }
                    idt=setTimeout(outer,2.5);

                }
            }
           
        }
        else
        {
            clearTimeout(idt);
            let g=i-1;
            document.querySelector("#bar"+g).style.background="red";
            disable(false);
        }

    }
    
}



/*Bubble Sort*/
function bubbleSort(array)
{
    disable(true);
    let i=-1;
    let idt;
    outer();
    function outer()
    {
        i++;
        if(i<array.length)
        {
            let j=-1;
            let id;
            inner();
            function inner()
            {
                j++;
                if(j<array.length-i)
                {
                    var k=j+1;
                    var a=pixelToNum(document.querySelector("#bar"+j).style.height);
                    var b=pixelToNum(document.querySelector("#bar"+k).style.height);
                    if(a>=b)
                    { 
                        let temp = document.querySelector("#bar"+j).style.height;
                        document.querySelector("#bar"+j).style.height=document.querySelector("#bar"+k).style.height;
                        document.querySelector("#bar"+k).style.height=temp;
                    }
                    
                    id=setTimeout(inner,0.1);

                }
                else
                {
                    clearTimeout(id);
                    if(j==array.length1)
                    {
                        let mal=j-1;
                        document.querySelector("#bar"+mal).style.background="purple";
                    }
                    else
                    document.querySelector("#bar"+j).style.background="purple";
                    for(let l=array.length-1;l>j;l--)
                    {
                        document.querySelector("#bar"+l).style.background="red";
                    }
                    
                }
            }
            idt=setTimeout(outer,(array.length-i)*5);
        }
        else
        {
            clearTimeout(idt);   
            document.querySelector("#bar"+1).style.background="red";
            disable(false);
        }
    }
}


/*Insertion Sort*/
function insertionSort(array)
{
    disable(true);
    let i=0;
    outer();
    function outer()
    {
        i++;
        if(i<array.length)
        {
            let key=document.querySelector("#bar"+i).style.height;
            document.querySelector("#bar"+i).style.background="blue";
            let j=i-1;
            inner();
            function inner()
            {
                if(j>-1)
                document.querySelector("#bar"+j).style.background="purple";

                
                if((j>-1)&&(pixelToNum(document.querySelector("#bar"+j).style.height)>pixelToNum(key)))
                {
                    let a=j+1;
                    
                    document.querySelector("#bar"+a).style.height=document.querySelector("#bar"+j).style.height;
                    document.querySelector("#bar"+j).style.background="red";
                    j--;
                    setTimeout(inner,0.1);
                }
                else
                {
                    let a=j+1;; 
                    document.querySelector("#bar"+a).style.height=key;
                    document.querySelector("#bar"+i).style.background="red";
                    for(let k=0;k<a-1;k++)
                    {
                        document.querySelector("#bar"+k).style.background="red";
                    }
                    setTimeout(outer,100);
                }
            }
        }
        else
        {
            for(let k=0;k<array.length;k++)
            {
                document.querySelector("#bar"+k).style.background="red";
            }
            disable(false);
        }
    }
   
}


/*Quick Sort*/
let lastpivot=0;
function quickSort(start,end)
{
    disable(true);
    let arr=[];
    let top=-1;
    arr[++top]=start;
    arr[++top]=end;
    loop()
    function loop()
    {
        if(top>=0)
        {
            end=arr[top--];
            start=arr[top--];
            
            partition(start,end).then(function(value) {

                let p=value;
                if(p-1>start)
                {
                    arr[++top]=start;
                    arr[++top]=p-1;
                }
                if(p+1<end)
                {
                    arr[++top]=p+1;
                    arr[++top]=end;
                }
                setTimeout(loop,200)
            });
        }
        else
        {
            document.querySelector("#bar"+lastpivot).style.background="red";
            disable(false);               
        }
    }   
}
async function partition(start,end)
{
    let partitionIndex=start-1;
    let pivot=pixelToNum(document.querySelector("#bar"+end).style.height);
    
    document.querySelector("#bar"+end).style.background="blue";
    if(lastpivot!=0)
    document.querySelector("#bar"+lastpivot).style.background="red";
    lastpivot=end;
    let i=start-1;
    loop();
    function loop()
    {
        i++;
        if(i<end)
        {
            let comp=pixelToNum(document.querySelector("#bar"+i).style.height)
            if(comp<=pivot)
            {
                partitionIndex++;
                let temp=document.querySelector("#bar"+i).style.height;
                document.querySelector("#bar"+i).style.height=document.querySelector("#bar"+partitionIndex).style.height;
                document.querySelector("#bar"+partitionIndex).style.height=temp;
                
            }
            loop();

        }
        else
        {
            let p=partitionIndex+1;
            let temporary=document.querySelector("#bar"+p).style.height;
            document.querySelector("#bar"+p).style.height=document.querySelector("#bar"+end).style.height;
            document.querySelector("#bar"+end).style.height=temporary;
        }
    }
    
return partitionIndex+1;
}

/*Merge Sort*/
function mergeSort(array,start,end,auxiliaryarray,animations)
{
    if(start === end)
    {
        return;
    }
    let mid = Math.floor((start+end) / 2);
    mergeSort(auxiliaryarray,start,mid,array,animations);
    mergeSort(auxiliaryarray,mid+1,end,array,animations);
    merge(array,start,mid,end,auxiliaryarray,animations);
}
function merge(array,start,mid,end,auxiliaryarray,animations)
{
    let i = start;
    let j = mid+1;
    let k = start;
    while((i <= mid) && (j <= end))
    {
        animations.push([i,j]);//for compairing -initial color change
        animations.push([i,j]);//for compairing -back to original
        if(auxiliaryarray[i] <= auxiliaryarray[j])
        {
            animations.push([k,auxiliaryarray[i]]);//height change
            array[k++]=auxiliaryarray[i++];
        }
        else
        {
            animations.push([k,auxiliaryarray[j]]);//height change
            array[k++]=auxiliaryarray[j++];
        }
    }
    // Collect remaining elements
       
    while(i <= mid)
    {
        animations.push([i,i]);//for compairing -initial color change
        animations.push([i,i]);//for compairing -back to original
        animations.push([k,auxiliaryarray[i]]);//height change
        array[k++]=auxiliaryarray[i++];
    }
    while(j <= end)
    {
        animations.push([j,j]);//for compairing -initial color change
        animations.push([j,j]);//for compairing -back to original
        animations.push([k,auxiliaryarray[j]]);//height change
        array[k++]=auxiliaryarray[j++];
    }
}
function animate(animations)
{
    
    disable(true);

    for (let i = 0; i < animations.length; i++)
    {
        let isColorChange = i % 3 !== 2;
        if (isColorChange)//animation for compairing
        {
            let [barOne, barTwo] = animations[i];
            let color = i % 3 === 0 ? "blue" : "red";
            setTimeout(() => {
                document.querySelector("#bar"+barOne).style.background = color;
                document.querySelector("#bar"+barTwo).style.background = color;
            }, i * 10);
        } 
        else //animation for overwriting
        {
            setTimeout(() => {
                let [barIdx, newHeight] = animations[i];
                document.querySelector("#bar"+barIdx).style.height = newHeight+"px";
                if(i==animations.length-1)
                disable(false);
            }, i * 10);
        }
      
    }
    

}