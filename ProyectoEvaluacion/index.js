$(".tab").click(function () {
    //hide all calculators
    $(".calculator").hide("slow", function () { });
    //show only chosen calculator.
    $(".calculator." + $(this).attr('class').split(/\s+/)[0]).show("slow", function () { });
});

$(".checklist.calculator").load("checklist.html");
// console.log("HELLO");

// console.log($(".checklist.calculator"));
var rowPayback = `
<div class="whole_row">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" min="0" value="0" required>
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" min="0" value="0" required>
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)" min="0" value="0" required>
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
</div>
`;
var rowNPV = `
<div class="whole_row">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
</div>
`;
var rowdepreciation = `
<div class="whole_row">
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">$</span>
        </div>
        <input readonly type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
            <span class="input-group-text">.00</span>
        </div>
    </div>
</div>
`;

var rows = {};

$(".periodsInput").change(function () {
    var parentType = findParentType($(this));
    if (document.getElementById("Periodo" + parentType).checkValidity())
        changeRows(parentType, $(this).val());
});

function findParentType(element) {
    return element.parent().parent().parent().attr('class').split(/\s+/)[0];
}

function changeRows(elementType, amount) {
    
    var row_type="";
    if (elementType == "payback")
        row_type = rowPayback;
    else if (elementType == "NPV")
        row_type = rowNPV;
    else if (elementType == "depreciation")
        row_type = rowdepreciation;

    if (rows[elementType] == undefined) {
        rows[elementType] = amount;
        $("." + elementType + "-rows").append(row_type.repeat(amount));
    }
    // alert("HELLO");
    var current = rows[elementType];
    if (current < amount) {
        //need more rows
        $("." + elementType + "-rows").append(row_type.repeat(amount - current));
        // alert("Row increased");
        rows[elementType] = amount;
    } else if (current > amount) {
        //need fewer rows
        for (let index = 0; index < current - amount; index++) {
            $("." + elementType + "-rows").children().last().remove();
        }
        // alert("Row decreased");
        rows[elementType] = amount;
    }

    // console.log(rows);
}

function getPayback(tazaInt, principal, cashflows) {
    var i = 0;
    for (; i < cashflows.length && principal > 0; i++) {
        const element = cashflows[i];
        principal -= element;
    }
    return i - 1; // I think
}

function clearRows(element) {
    // alert(findParentType($(this)));
    $("." + findParentType($(element)) + "-rows>div>input").val('');
}

function getNPV(tazaInt, principal, cashFlows) {
    var npv = principal;

    for (var i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(tazaInt / 100 + 1, i + 1);
    }

    return npv;
}

function calculatePayback(){
    //get principal, tax
    var principal = $("#PrincipalPayback").val();
    var tax = $("#TazaPayback").val();
    var found = false;
    $(".payback-rows>.whole_row").each(function(i,element){
        var inputs = $(element).children("div").children("input");
        var outflow = inputs.eq(0).val();
        var inflow = inputs.eq(1).val();
        var total_flow=(inflow-outflow)/Math.pow(1+(tax/100),i+1);
        principal -= total_flow;
        if(-principal >= 0 && !found){
            alert((i+1)+" is first break even period");
            found = true;
        }
        console.log(inputs.eq(2).val(""+-principal));
        
        // inputs.eq(2).value(inflow-outflow);
        // console.log($(element).children("div").children("input").eq(1).val());
    });
    // console.log($(".payback-rows>.whole_row>div>input").eq(0).val());
}
