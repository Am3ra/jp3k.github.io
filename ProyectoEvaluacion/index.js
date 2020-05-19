$(".tab").click(function () {
    //hide all calculators
    $(".calculator").hide("slow",function (){});
    //show only chosen calculator.
    $(".calculator."+$(this).attr('class').split(/\s+/)[0]).show("slow",function (){}); 
});

var row = `
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text">$</span>
  </div>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
  <div class="input-group-append">
    <span class="input-group-text">.00</span>
  </div>
</div>
`;

var rows= {};

$(".periodsInput").change(function () { 
    var parentType = findParentType($(this));
    // alert(parentType);
    if(document.getElementById("Periodo"+parentType).checkValidity()){
        // alert($(this).val());
        changeRows(parentType,$(this).val());
    }
});

function findParentType(element){
    return element.parent().parent().parent().attr('class').split(/\s+/)[0];
}

function changeRows(elementType, amount){
    if(rows[elementType]== undefined){
        rows[elementType] = amount;
        $("."+elementType+"-rows").append(row.repeat(amount));
    }

    // alert("HELLO");
    var current = rows[elementType];
    if(current < amount){
        //need more rows
        $("."+elementType+"-rows").append(row.repeat(amount-current));
        // alert("Row increased");
        rows[elementType] = amount;
    }else if(current > amount){
        //need fewer rows
        for (let index = 0; index < current-amount; index++) {
            $("."+elementType+"-rows").children().last().remove();
        }
        // alert("Row decreased");
        rows[elementType] = amount;
    }

    // console.log(rows);
}
