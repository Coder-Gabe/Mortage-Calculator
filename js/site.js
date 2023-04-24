//Function getValues
function getValues() {
	//Get User Values from the DOM.
	let loanAmount = document.getElementById("loanAmount").value;
	let termMonths = document.getElementById("termMonths").value;
	let interestRate = document.getElementById("interestRate").value;


	//Validate for integers and floats.
	loanAmount = parseInt(loanAmount);
	termMonths = parseInt(termMonths);
	interestRate = parseFloat(interestRate).toFixed(1);

	
	// WORKING ON THIS SWEET ALERT //
	// if (!isNAN(loanAmount) && !isNAN(termMonths) && !isNAN(interestRate) && loanAmount > 0 && termMonths > 0 && interestRate > 0) {

	// }else {
	// 	Swal.fire({
	// 		icon: 'error',
	// 		backdrop: false,
	// 		title: 'Uh oh!',
	// 		text: 'Please ener a valid number'
	// 	})
	// }

	let values = {
		loanAmount: loanAmount,
		termMonths: termMonths,
		interestRate: interestRate,
	}

	calculateInputs(values);
	

}



function calculateInputs(values) {

	let totalArray = [];
	let paymentArray = [];
	
	let termMonths = values.termMonths;
	let interestRate = values.interestRate;
	let loanAmount = values.loanAmount;

	let totalMonthlyPayment = (loanAmount * (interestRate / 1200)) / (1 - (1 + interestRate / 1200) ** -termMonths);
	let remainingBalance = loanAmount;
	let totalPrincipal = 0;
	let totalInterest = 0;
	let totalCost = 0;


	for (let i = 1; i <= termMonths; i++) {
		
		let interestPayment = remainingBalance * (interestRate / 1200);
		let principalPayment = totalMonthlyPayment - interestPayment;
		
		
		remainingBalance -= principalPayment;
		totalInterest += interestPayment;
		totalPrincipal += principalPayment;
		totalCost = totalInterest + totalPrincipal;

		let paymentValues = {
			month: i,
			payment: totalMonthlyPayment.toFixed(2),
			principal: principalPayment.toFixed(2),
			interest: interestPayment.toFixed(2),
			totalInterest: totalInterest.toFixed(2),
			balance: Math.abs(remainingBalance.toFixed(2))
		};

		let totalValues = {
			
			totalPrincipal: totalPrincipal.toFixed(2),
			totalInterest: totalInterest.toFixed(2),
			totalCost: totalCost.toFixed(2)
		};

		paymentArray.push(paymentValues);
		totalArray.push(totalValues);

	}

	displayPaymentsTable(paymentArray);
	displayTotals(totalArray);

	
}
	
function displayPaymentsTable(paymentArray) {
	
	
	const monthTemplate = document.getElementById("tableRowTemplate");

	monthTable.innerHTML = "";

	for (let i = 0; i < paymentArray.length; i++) {
		let array = paymentArray[i];

		let tableRow = document.importNode(monthTemplate.content, true);

		tableRow.querySelector('[data-id="month"]').textContent = array.month;
		tableRow.querySelector('[data-id="payment"]').textContent = array.payment;
		tableRow.querySelector('[data-id="principal"]').textContent = array.principal;
		tableRow.querySelector('[data-id="interest"]').textContent = array.interest;
		tableRow.querySelector('[data-id="totalInterest"]').textContent = array.totalInterest;
		tableRow.querySelector('[data-id="balance"]').textContent = array.balance;
		tableRow.querySelector("tr").setAttribute("data-array", array.id);

		
		monthTable.appendChild(tableRow);
	}
}



function displayTotals(totalArray) {

	 let formatter = new Intl.NumberFormat('en-US', 
	 {
	 	style: 'currency', 
		currency: 'USD',
	 });
	
   	let totalPrincipal = formatter.format(totalArray);
	let totalInterest = formatter.format(totalArray);
	let totalCost = formatter.format(totalArray);


	let principal = totalArray[totalPrincipal.length - 1];
	let interest = totalArray[totalInterest.length - 1];
	let cost = totalArray[totalCost.length - 1];

	


	document.getElementById("totalPrinciple").innerText = principal.totalPrincipal;
	document.getElementById("totalInterest").innerText = interest.totalInterest;
	document.getElementById("totalCost").innerText = cost.totalCost;
	

	let termMonths = document.getElementById("termMonths").value;
	termMonths = parseInt(termMonths);

	let monthlyPayment = (document.getElementById("totalCost").innerText = cost.totalCost) / termMonths;

	monthlyPayment = monthlyPayment.toFixed(2)

	document.getElementById("monthlyPayment").innerText = monthlyPayment;
}



