
function $(_) {return document.getElementById(_);}
let provider= {};
let signer= {};

window.addEventListener(
	'load',
	async function() {
		console.log("waitin for 3 secs..");
		$("cw_m").innerHTML = "Connecting.. Please wait."
		setTimeout(async () => { await basetrip(); }, 3000);
	},
	false
);

document.addEventListener('DOMContentLoaded', function() {
    paintStatic();
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("tablinks_"+tabName).className+=" active";
    document.getElementById(tabName).style.display = "block";
    //evt?.currentTarget?.className += " active";
    //window.location = "#"+tabName;
}



async function basetrip()
{
	if(!(window.ethereum)){$("cw_m").innerHTML = "Wallet wasn't detected!";console.log("Wallet wasn't detected!");notice("<h3>Wallet wasn't detected!</h3>Please make sure that your device and browser have an active Web3 wallet like MetaMask installed and running.<br><br>Visit <a href='https://metamask.io' target='_blank'>metamask.io</a> to install MetaMask wallet.");provider = new ethers.providers.JsonRpcProvider(RPC_URL); await dexstats();return}
	else if(!Number(window.ethereum.chainId)==CHAINID){$("cw_m").innerHTML = "Wrong network! Please Switch to "+CHAINID;provider = new ethers.providers.Web3Provider(window.ethereum);await dexstats();notice("<h3>Wrong network!</h3>Please Switch to Chain #"+CHAINID+"<btr"+ CHAIN_NAME+ "</u> Blockchain.");}
	else if(//typeOf window.ethereum == Object &&Number(window.ethereum.chainId)
		Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Recognized Ethereum Chain:", window.ethereum.chainId,CHAINID);
		provider = new ethers.providers.Web3Provider(window.ethereum)
		signer = provider.getSigner();
		if(!(window.ethereum.selectedAddress==null)){console.log("Found old wallet:", window.ethereum.selectedAddress);cw();}
		else{console.log("Didnt find a connected wallet!");cw();}
		//chkAppr(tokes[1][0])
	}
	else //if(Number(window.ethereum.chainId)==CHAINID)
	{
		console.log("Couldn't find Ethereum Provider - ",CHAINID,window.ethereum.chainId)
		if((typeof Number(window.ethereum.chainId) == "number")){$("cw_m").innerHTML = "Wrong network! Switch from " + Number(window.ethereum.chainId)+" to "+CHAINID}
		provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		signer = provider.getSigner()
		$("connect").innerHTML=`Wallet not found.<br><br><button onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Retry?</button>`;
		notice(`Wallet not found.<br><br><button onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Retry?</button>`);
	}

	if(
		window.ethereum.chainId
		&& (Number(window.ethereum.chainId) != null )
		&& (window.ethereum.chainId != CHAINID)
	) {
		await window.ethereum.request({
    		method: "wallet_addEthereumChain",
    		params: [{
        		chainId: "0x"+(CHAINID).toString(16),
        		rpcUrls: [RPC_URL],
        		chainName: CHAIN_NAME,
        		nativeCurrency: {
            		name: CHAIN_GAS,
            		symbol: CHAIN_GAS,
            		DECIMAL: 18
        		},
        		blockExplorerUrls: [EXPLORE]
    		}]
		});
		//window.location.reload()
		notice(`Switching Network...<br>Please Refresh the Page<br><button onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</button>`);
	}
	//DrefreshFarm()
	arf()
	cw()
	await dexstats()
}



/*
function fornum(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Qt."}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Qd."}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Tn."}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Bn."}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Mn."}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Th."}
	else if(_n>0){n_=(_n/1e0).toFixed(5)+""}
	return(n_);
}
*/
function fornum(n,d) {
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(3)+"Qt"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(3)+"Qd"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(3)+"T"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(3)+"B"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(3)+"M"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(3)+"K"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(5)+""}
	else if(_n>0.0){n_=(_n/1e0).toFixed(8)+""}
	return(n_);
}
function fornum5(n,d) {
	return (Number(n)/10**Number(d)).toLocaleString(undefined,{maximumFractionDigits:d}) ;
}
function fornum6(n,f) {
	return (Number(n)).toLocaleString(undefined,{maximumFractionDigits:f}) ;
}

async function cw() {
	let cs = await cw2(); cs?console.log("Good to Transact"):cw2();
	cw2();
}
async function cw2() {
	if(!(window.ethereum)){notice(`Metamask not detected!<br>Please Refresh the Page<br><button onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</button>`);return(0)}
	if(!(Number(window.ethereum.chainId)==CHAINID)){notice(`Wrong network detected!<br>Please switch to chain ID ${CHAINID} and refresh this page.<br><button onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</button>`);return(0)}
	if(typeof provider == "undefined"){notice(`Provider not detected!<br>Please connect with a web3 provider or wallet and refresh this page.<br><button onclick="window.location.reload()" class="c2a-1 submit equal-gradient c2abtn">Refresh</button>`);return(0)}
	/*
	if(!
		(isFinite(Number(accounts[0])))
		|| (isFinite(Number(window.ethereum.selectedAddress)))
	){console.log("NAAAAAAAAAAAAAAAAA");window.location.reload();}
	*/

	//004
	window.ethereum
	.request({ method: 'eth_requestAccounts' })
	.then(r=>{console.log("004: Success:",r);})	//re-curse to end curse, maybe..
	.catch((error) => {	console.error("004 - Failure", r, error); });


	//005
	const accounts = await window.ethereum.request({ method: 'eth_accounts' });
	if(Number(accounts[0])>0){console.log("005: Success - ", accounts)}
	else{console.log("005: Failure", accounts)}


	/*006
	const en6 = await window.ethereum.enable()
	if(Number(en6[0]) > 0){console.log("006 - Success",en6)}
	else{console.log("006 - Failure", en6)}
	*/


	/*003
	try {
      console.log("attempting cw()")
      const addresses = await provider.request({ method: "eth_requestAccounts" });
      console.log("addresses:",addresses)
    } catch (e) {
      console.log("error in request", e);
      window.location.reload(true);
    }
    */

    //002
    //try{await provider.send("eth_requestAccounts", []);console.log("CWE:",e);}//await window.ethereum.enable();
	//catch(e){console.log("CWE:",e);window.location.reload(true)}
	console.log("doing the paints")
	$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);
	if(window.ethereum.chainId==250) (new ethers.Contract("0x14ffd1fa75491595c6fd22de8218738525892101",["function getNames(address) public view returns(string[] memory)"],provider)).getNames(window.ethereum.selectedAddress).then(rn=>{if(rn.length>0){$("cw").innerHTML="hi, <span style='/*font-family:bold;font-size:1.337em*/'>"+rn[0]+"</span> 👋"}else{$("cw").innerHTML= (window.ethereum.selectedAddress).substr(0,10) +"..."+(window.ethereum.selectedAddress).substr(34);}})
	$("cw_m").innerHTML=""
	$("connect").style.display="none";
	$("switch").style.display="block";
	//farm_1_f_chappro()
	gubs();
	return(1);
}
function fornum2(n,d)
{
	_n=(Number(n)/10**Number(d));
	n_=_n;
	if(_n>1e18){n_=(_n/1e18).toFixed(2)+" Quintillion"}
	else if(_n>1e15){n_=(_n/1e15).toFixed(2)+" Quadrillion"}
	else if(_n>1e12){n_=(_n/1e12).toFixed(2)+" Trillion"}
	else if(_n>1e9){n_=(_n/1e9).toFixed(2)+" Billion"}
	else if(_n>1e6){n_=(_n/1e6).toFixed(2)+" Million"}
	else if(_n>1e3){n_=(_n/1e3).toFixed(2)+" Thousand"}
	else if(_n>1e0){n_=(_n/1e0).toFixed(4)+""}
	else if(_n>0){n_=(_n).toFixed(8)+""}
	return(n_);
}


function notice(c) {
	window.location = "#note"
	$("content1").innerHTML = c
	console.log(c)
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const timeFormat = (timestamp) => {const seconds = Math.floor((Date.now() - timestamp) / 1000);const prefix = seconds < 0 ? "For the next " : "Expired ";const absSeconds = Math.abs(seconds);return prefix + (absSeconds < 60 ? absSeconds + " seconds" : absSeconds < 3600 ? Math.floor(absSeconds / 60) + " minutes" : absSeconds < 86400 ? Math.floor(absSeconds / 3600) + " hours" : absSeconds < 2592000 ? Math.floor(absSeconds / 86400) + " days" : absSeconds < 31536000 ? Math.floor(absSeconds / 2592000) + " months" : Math.floor(absSeconds / 31536000) + " years") + (seconds < 0 ? "" : " ago");};

LPABI = ["function balanceOf(address) public view returns(uint)","function metadata() public view returns(uint,uint,uint,uint,bool,address,address)","function getAssetPrice(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function earned(address,address) public view returns(uint)","function earnings(address,address) public view returns(uint)","function name() public view returns(string)","function symbol() public view returns(string)","function tvl() public view returns(uint)","function apr() public view returns(uint)","function totalSupply() public view returns(uint)","function deposit(uint)","function withdraw(uint)","function depositAll()","function withdrawAll()","function mint(uint)","function redeem(uint)","function mintAll()","function redeemAll()"]

DEPOSITOR_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"bribe","type":"address"},{"indexed":true,"internalType":"bool","name":"active","type":"bool"}],"name":"BribeTokenSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"initiator","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aum","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"interest","type":"uint256"}],"name":"Minted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"initiator","type":"address"},{"indexed":true,"internalType":"address","name":"taker","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ProtocolFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aum","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"interest","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"baseAPR","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aum","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aum2","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastAccrual","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Yield","type":"event"},{"inputs":[],"name":"BASE","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BRIBE","outputs":[{"internalType":"contract IBribe","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMPOUND_CTOKEN","outputs":[{"internalType":"contract ICompoundCToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMPOUND_UNITROLLER","outputs":[{"internalType":"contract ICompoundUnitroller","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SENTINEL","outputs":[{"internalType":"contract ISentinel","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WRAP","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"name":"acceptAirdrops","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_t","type":"address"}],"name":"addBribeToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tks","type":"address[]"}],"name":"addBribeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"alwaysClaimFees","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseAPR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseAUM","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseAccrualTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"bribeTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bribesListLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeTaker","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interactions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"base","type":"address"},{"internalType":"contract IERC20","name":"wrap","type":"address"},{"internalType":"contract ICompoundUnitroller","name":"u","type":"address"},{"internalType":"contract ICompoundCToken","name":"ct","type":"address"},{"internalType":"contract ISentinel","name":"s","type":"address"},{"internalType":"contract IBribe","name":"b","type":"address"},{"internalType":"address[]","name":"btoks","type":"address[]"}],"name":"intialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isBribeToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_t","type":"address"}],"name":"removeBribeToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tks","type":"address[]"}],"name":"removeBribeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20[]","name":"_tks","type":"address[]"},{"internalType":"bool[]","name":"_aa","type":"bool[]"}],"name":"setAcceptAirdrops","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setAlwaysdClaimFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_b","type":"address"}],"name":"setBribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ft","type":"address"}],"name":"setFeeTaker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_m","type":"address"}],"name":"setManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_b","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalFeesPayouts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

CTOKEN_ABI = [{"inputs":[{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"contract ComptrollerInterface","name":"comptroller_","type":"address"},{"internalType":"contract InterestRateModel","name":"interestRateModel_","type":"address"},{"internalType":"uint256","name":"initialExchangeRateMantissa_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"DECIMAL_","type":"uint8"},{"internalType":"address payable","name":"admin_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AcceptAdminPendingAdminCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"actualAddAmount","type":"uint256"}],"name":"AddReservesFactorFreshCheck","type":"error"},{"inputs":[],"name":"BorrowCashNotAvailable","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"BorrowComptrollerRejection","type":"error"},{"inputs":[],"name":"BorrowFreshnessCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateAccrueBorrowInterestFailed","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateAccrueCollateralInterestFailed","type":"error"},{"inputs":[],"name":"LiquidateCloseAmountIsUintMax","type":"error"},{"inputs":[],"name":"LiquidateCloseAmountIsZero","type":"error"},{"inputs":[],"name":"LiquidateCollateralFreshnessCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateComptrollerRejection","type":"error"},{"inputs":[],"name":"LiquidateFreshnessCheck","type":"error"},{"inputs":[],"name":"LiquidateLiquidatorIsBorrower","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateRepayBorrowFreshFailed","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"LiquidateSeizeComptrollerRejection","type":"error"},{"inputs":[],"name":"LiquidateSeizeLiquidatorIsBorrower","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"MintComptrollerRejection","type":"error"},{"inputs":[],"name":"MintFreshnessCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"RedeemComptrollerRejection","type":"error"},{"inputs":[],"name":"RedeemFreshnessCheck","type":"error"},{"inputs":[],"name":"RedeemTransferOutNotPossible","type":"error"},{"inputs":[],"name":"ReduceReservesAdminCheck","type":"error"},{"inputs":[],"name":"ReduceReservesCashNotAvailable","type":"error"},{"inputs":[],"name":"ReduceReservesCashValidation","type":"error"},{"inputs":[],"name":"ReduceReservesFreshCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"RepayBorrowComptrollerRejection","type":"error"},{"inputs":[],"name":"RepayBorrowFreshnessCheck","type":"error"},{"inputs":[],"name":"SetComptrollerOwnerCheck","type":"error"},{"inputs":[],"name":"SetInterestRateModelFreshCheck","type":"error"},{"inputs":[],"name":"SetInterestRateModelOwnerCheck","type":"error"},{"inputs":[],"name":"SetPendingAdminOwnerCheck","type":"error"},{"inputs":[],"name":"SetReserveFactorAdminCheck","type":"error"},{"inputs":[],"name":"SetReserveFactorBoundsCheck","type":"error"},{"inputs":[],"name":"SetReserveFactorFreshCheck","type":"error"},{"inputs":[{"internalType":"uint256","name":"errorCode","type":"uint256"}],"name":"TransferComptrollerRejection","type":"error"},{"inputs":[],"name":"TransferNotAllowed","type":"error"},{"inputs":[],"name":"TransferNotEnough","type":"error"},{"inputs":[],"name":"TransferTooMuch","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"cashPrior","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"interestAccumulated","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"borrowIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"AccrueInterest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"borrowAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrows","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"Borrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"liquidator","type":"address"},{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"repayAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"cTokenCollateral","type":"address"},{"indexed":false,"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"name":"LiquidateBorrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"mintAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mintTokens","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"NewAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract ComptrollerInterface","name":"oldComptroller","type":"address"},{"indexed":false,"internalType":"contract ComptrollerInterface","name":"newComptroller","type":"address"}],"name":"NewComptroller","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract InterestRateModel","name":"oldInterestRateModel","type":"address"},{"indexed":false,"internalType":"contract InterestRateModel","name":"newInterestRateModel","type":"address"}],"name":"NewMarketInterestRateModel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldPendingAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newPendingAdmin","type":"address"}],"name":"NewPendingAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldReserveFactorMantissa","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newReserveFactorMantissa","type":"uint256"}],"name":"NewReserveFactor","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"redeemer","type":"address"},{"indexed":false,"internalType":"uint256","name":"redeemAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"redeemTokens","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"repayAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accountBorrows","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalBorrows","type":"uint256"}],"name":"RepayBorrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"benefactor","type":"address"},{"indexed":false,"internalType":"uint256","name":"addAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTotalReserves","type":"uint256"}],"name":"ReservesAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"admin","type":"address"},{"indexed":false,"internalType":"uint256","name":"reduceAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTotalReserves","type":"uint256"}],"name":"ReservesReduced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_acceptAdmin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"addAmount","type":"uint256"}],"name":"_addReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"compLikeDelegatee","type":"address"}],"name":"_delegateCompLikeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"reduceAmount","type":"uint256"}],"name":"_reduceReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ComptrollerInterface","name":"newComptroller","type":"address"}],"name":"_setComptroller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract InterestRateModel","name":"newInterestRateModel","type":"address"}],"name":"_setInterestRateModel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newPendingAdmin","type":"address"}],"name":"_setPendingAdmin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newReserveFactorMantissa","type":"uint256"}],"name":"_setReserveFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accrualBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accrueInterest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOfUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"borrowAmount","type":"uint256"}],"name":"borrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"borrowBalanceCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"borrowBalanceStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowRatePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"comptroller","outputs":[{"internalType":"contract ComptrollerInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DECIMAL","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exchangeRateCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exchangeRateStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountSnapshot","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"contract ComptrollerInterface","name":"comptroller_","type":"address"},{"internalType":"contract InterestRateModel","name":"interestRateModel_","type":"address"},{"internalType":"uint256","name":"initialExchangeRateMantissa_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"DECIMAL_","type":"uint8"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ComptrollerInterface","name":"comptroller_","type":"address"},{"internalType":"contract InterestRateModel","name":"interestRateModel_","type":"address"},{"internalType":"uint256","name":"initialExchangeRateMantissa_","type":"uint256"},{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"DECIMAL_","type":"uint8"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"interestRateModel","outputs":[{"internalType":"contract InterestRateModel","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isCToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"repayAmount","type":"uint256"},{"internalType":"contract CTokenInterface","name":"cTokenCollateral","type":"address"}],"name":"liquidateBorrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingAdmin","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"protocolSeizeShareMantissa","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"redeemTokens","type":"uint256"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"redeemAmount","type":"uint256"}],"name":"redeemUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"repayAmount","type":"uint256"}],"name":"repayBorrow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"repayAmount","type":"uint256"}],"name":"repayBorrowBehalf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveFactorMantissa","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"liquidator","type":"address"},{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"seizeTokens","type":"uint256"}],"name":"seize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"supplyRatePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract EIP20NonStandardInterface","name":"token","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrows","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBorrowsCurrent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

EL_27_ABI = [{"inputs": [],"name": "LA","outputs": [{"internalType": "contract ILA","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IP","name": "p","type": "address"}],"name": "bucketList","outputs": [{"internalType": "uint24[]","name": "","type": "uint24[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint24[]","name": "inp","type": "uint24[]"}],"name": "cast_24_256","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "farmType","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "guard","type": "address"}],"name": "getClset","outputs": [{"internalType": "uint256[13]","name": "ret","type": "uint256[13]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address[3][]","name": "_id","type": "address[3][]"}],"name": "getClsets","outputs": [{"internalType": "uint256[13][]","name": "","type": "uint256[13][]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "contract IELM","name": "elm","type": "address"},{"internalType": "address","name": "user","type": "address"}],"name": "getElmaCompoundFarm","outputs": [{"internalType": "uint256[18]","name": "ret","type": "uint256[18]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland[]","name": "_farms","type": "address[]"},{"internalType": "contract IELM[]","name": "_elm","type": "address[]"},{"internalType": "address","name": "_user","type": "address"}],"name": "getElmaCompoundFarms","outputs": [{"internalType": "uint256[18][]","name": "","type": "uint256[18][]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "address","name": "user","type": "address"}],"name": "getSimpleFarm","outputs": [{"internalType": "uint256[7]","name": "ret","type": "uint256[7]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland[]","name": "_farms","type": "address[]"},{"internalType": "address","name": "_user","type": "address"}],"name": "getSimpleFarms","outputs": [{"internalType": "uint256[7][]","name": "","type": "uint256[7][]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_user","type": "address"},{"internalType": "address","name": "_pool","type": "address"}],"name": "getTotalPosition","outputs": [{"internalType": "uint256","name": "x","type": "uint256"},{"internalType": "uint256","name": "y","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract ILA","name": "_la","type": "address"}],"name": "initializer","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "user","type": "address"},{"internalType": "address","name": "_pair","type": "address"}],"name": "positionOf","outputs": [{"internalType": "uint256[]","name": "bIds","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsX","type": "uint256[]"},{"internalType": "uint256[]","name": "amountsY","type": "uint256[]"},{"internalType": "uint256[]","name": "liquidities","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_f","type": "address"},{"internalType": "uint256","name": "_t","type": "uint256"}],"name": "setFarmType","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_wrapper","type": "address"},{"internalType": "address","name": "_vault","type": "address"},{"internalType": "address","name": "_vaultPool","type": "address"}],"name": "setVaultPools","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "vaultPools","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "vaults","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

EL_30_ABI = [{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "contract IELM","name": "elm","type": "address"},{"internalType": "address","name": "user","type": "address"}],"name": "getElmaCompoundFarm","outputs": [{"internalType": "uint256[18]","name": "ret","type": "uint256[18]"},{"components": [{"internalType": "uint256[]","name": "unclaimed","type": "uint256[]"},{"internalType": "uint256[]","name": "claimed","type": "uint256[]"}],"internalType": "struct Equalens_30_elma.Earnings","name": "earn","type": "tuple"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland[]","name": "_farms","type": "address[]"},{"internalType": "contract IELM[]","name": "_elm","type": "address[]"},{"internalType": "address","name": "_user","type": "address"}],"name": "getElmaCompoundFarms","outputs": [{"internalType": "uint256[18][]","name": "","type": "uint256[18][]"},{"components": [{"internalType": "uint256[]","name": "unclaimed","type": "uint256[]"},{"internalType": "uint256[]","name": "claimed","type": "uint256[]"}],"internalType": "struct Equalens_30_elma.Earnings[]","name": "","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland","name": "farm","type": "address"},{"internalType": "address","name": "user","type": "address"}],"name": "getSimpleFarm","outputs": [{"internalType": "uint256[7]","name": "ret","type": "uint256[7]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IFarmland[]","name": "_farms","type": "address[]"},{"internalType": "address","name": "_user","type": "address"}],"name": "getSimpleFarms","outputs": [{"internalType": "uint256[7][]","name": "","type": "uint256[7][]"}],"stateMutability": "view","type": "function"}]


async function paintStatic() {

}

async function dexstats() {
	ds_equalprice = Number(await (new ethers.Contract("0xA480DfB5c15BbF4FA74aC55397a53b3ae38c19E2",LPABI,provider)).getAssetPrice("0x3fd3a0c85b70754efc07ac9ac0cbbdce664865a6"))/10**18;
	//_EL_27 = new ethers.Contract("0x1b1c9a41a96dE931c7508BD2C653C57C63cD32a4", EL_27_ABI, provider);
	//_ds = await _EL_27.getElmaCompoundFarms( POOLS.map(i=>i.farmaddr) , POOLS.map(i=>i.depositor) , "0x0000000000000000000000000000000000001234" );
	_EL_30 = new ethers.Contract("0x8C1C50fFa373f8C2b82A4Fc591c2c710e2982f01", EL_30_ABI, provider);
	_user = window.ethereum?.selectedAddress ? window.ethereum?.selectedAddress : "0x0000000000000000000000000000000000001234"
	_dsd = await _EL_30.getElmaCompoundFarms( POOLS.map(i=>i.farmaddr) , POOLS.map(i=>i.depositor) , _user );
	_ds = _dsd[0];
	/*
		ret[0] = base.totalSupply();
		ret[1] = ctoken.totalSupply();
		ret[2] = wrap.totalSupply();
		ret[3] = farm.totalSupply();

		ret[4] = elm.baseAPR();
		ret[5] = farm.tvlDeposits();
		ret[6] = farm.apr();

		ret[7] = ctoken.getCash();
		ret[8] = ctoken.totalBorrows();
		ret[9] = ctoken.balanceOf(address(elm));

		if(user==0x0000000000000000000000000000000000001234) return ret;
		ret[10] = base.balanceOf(user);
		ret[11] = ctoken.balanceOf(user);
		ret[12] = wrap.balanceOf(user);
		ret[13] = farm.balanceOf(user);

		ret[14] = base.allowance(user, address(ctoken));
		ret[15] = base.allowance(user, address(elm));
		ret[16] = wrap.allowance(user, address(farm));



		ret[0] = base.totalSupply();
		ret[1] = ctoken.totalSupply();
		ret[2] = wrap.totalSupply();
		ret[3] = farm.totalSupply();

		ret[4] = farm.tvlDeposits();
		ret[5] = farm.apr();

		ret[6] = elm.baseAPR();
		ret[7] = elm.interactions();

		ret[8] = ctoken.getCash();
		ret[9] = ctoken.totalBorrows();
		ret[10] = ctoken.balanceOf(address(elm));

		if(user==0x0000000000000000000000000000000000001234) return ret;
		ret[11] = base.balanceOf(user);
		ret[12] = ctoken.balanceOf(user);
		ret[13] = wrap.balanceOf(user);
		ret[14] = farm.balanceOf(user);

		ret[15] = base.allowance(user, address(ctoken));
		ret[16] = base.allowance(user, address(elm));
		ret[17] = wrap.allowance(user, address(farm));
	*/

	$("mainstage").innerHTML = `
		<div class="c2a90-row">
			<div>Underlying		<br><span class="c2a90-row-byline">Base Asset</span></div>
			<div>LM				<br><span class="c2a90-row-byline">Lending Market</span></div>
			<div>PT Supply		<br><span class="c2a90-row-byline">Total Wrapped</span></div>
			<div></div>
			<div>PT Staked		<br><span class="c2a90-row-byline">In Elma Gauge</span></div>
			<div>PT APR			<br><span class="c2a90-row-byline">Boosted APR</span></div>
			<div>LM Cash		<br><span class="c2a90-row-byline">Exit Liquidity</span></div>
			<div>LM Size		<br><span class="c2a90-row-byline">Underlying LM pool</span></div>
			<div></div>
			<div>LM Loans		<br><span class="c2a90-row-byline">Borrowed from LM</span></div>
			<div>YT APR			<br><span class="c2a90-row-byline">LM Interest APR</span></div>
		</div>
	`;

	if(Number(_user)>0x1234) {
		$("portfolio-area").style.display="";
		$("portfolio").innerHTML = `
			<div class="c2a90-row c2a90-row-port">
				<div>Underlying</div>
				<div>Market</div>
				<div>UT in wallet</div>
				<div>UT in LM</div>
				<div>PT in Wallet</div>
				<div>PT Staked</div>
				<div>Claimable</div>
				<div>Total Earned</div>
			</div>
		`;
	}

	ds_totalwrapmktcap =0;
	ds_totaltxs =0;

	dsu_totalbase =0;
	dsu_totalctok =0;
	dsu_totalwrap =0;
	dsu_totalfarm =0;
	dsu_totalrew0 =0;
	dsu_totaltre0 =0;
	dsu_totalport =0;
	dsu_annualrew =0;


	for(i=0;i<POOLS.length;i++) {

		ds_farmtvl = (Number(_ds[i][4])/1e18);
		ds_farmapr = (Number(_ds[i][5])/1e18);
		ds_ctokenapr = (Number(_ds[i][6])/1e18);
		ds_ctokts = (Number(_ds[i][1])) / (10 ** 8);
		ds_wrapts = (Number(_ds[i][2])) / (10**POOLS[i].basedeci);
		ds_farmts = (Number(_ds[i][3])) / (10**POOLS[i].basedeci);
		ds_wrapprice = ds_farmtvl / ds_farmts;
		ds_wrapmktcap = (ds_wrapts * ds_wrapprice )
		ds_cash = (Number(_ds[i][8])) / 10**POOLS[i].basedeci;
		ds_borrowed = (Number(_ds[i][9])) / 10**POOLS[i].basedeci;
		ds_ctokprice = (ds_cash + ds_borrowed) * ds_wrapprice / ds_ctokts;

		ds_totalwrapmktcap += ds_wrapmktcap;
		ds_totaltxs += Number(_ds[i][7]);

/*
		$("topstat-tvl").innerHTML = "$" + (ds_wrapprice * ds_wrapts).toLocaleString(undefined,{maximumFractionDigits:0})
		$("topstat-staked").innerHTML = "$" + (ds_wrapprice * ds_farmts).toLocaleString(undefined,{maximumFractionDigits:0})
		$("topstat-cash").innerHTML = "$" + (ds_wrapprice * ds_cash).toLocaleString(undefined,{maximumFractionDigits:0})
		$("topstat-borrowed").innerHTML = "$" + (ds_wrapprice * ds_borrowed).toLocaleString(undefined,{maximumFractionDigits:0})
*/

		$("mainstage").innerHTML += `
			<div class="c2a90-row" onclick="window.location='${POOLS[i].wrapname}'">
				<div><img src="${LOGOS + POOLS[i].baseaddr.toLowerCase()}.png"> ${ POOLS[i].basename }</div>
				<div><img src="${LOGOS + POOLS[i].marketlogo.toLowerCase()}.png"> ${ POOLS[i].marketname }</div>
				<div>$${ fornum6(ds_wrapmktcap, 0) }</div>
				<div>${ drawPie([ds_farmtvl,ds_wrapmktcap-ds_farmtvl],['#45e7e8','#6d05d7']) }</div>
				<div class="main-amt">$${ fornum6(ds_farmtvl,0) }</div>
				<div class="main-amt">${ fornum6(ds_farmapr, ds_farmapr>1?2:4)}% 🔥</div>
				<div>$${ fornum6(ds_cash, 0) }</div>
				<div>$${ fornum6((ds_cash+ds_borrowed), 0) }</div>
				<div>${ drawPie([ds_borrowed,ds_cash],['#f0890b','#15c66b']  ) }</div>
				<div>$${ fornum6(ds_borrowed, 0) }</div>
				<div>${ fornum6(ds_ctokenapr, ds_ctokenapr>1?2:4)}%</div>
			</div>
		`;


		if(Number(_user)>0x1234) {
			dsu_base = (Number(_ds[i][11])) / (10**POOLS[i].basedeci);
			dsu_ctok = (Number(_ds[i][12])) / (10 ** 8);
			dsu_wrap = (Number(_ds[i][13])) / (10**POOLS[i].basedeci);
			dsu_farm = (Number(_ds[i][14])) / (10**POOLS[i].basedeci);

			dsu_rew0 = (Number(_dsd[1][i][0][0])) / (10**18);
			dsu_tre0 = ( (Number(_dsd[1][i][0][0])) + (Number(_dsd[1][i][1][0])) ) / (10**18);

			$("portfolio").innerHTML += `
				<div class="c2a90-row c2a90-row-port" onclick="window.location='${POOLS[i].wrapname}'">
					<div><img src="${LOGOS + POOLS[i].baseaddr.toLowerCase()}.png"> ${ POOLS[i].basename }</div>
					<div><img src="${LOGOS + POOLS[i].marketlogo.toLowerCase()}.png"> ${ POOLS[i].marketname }</div>
					<div>$${ fornum6(ds_wrapprice * dsu_base, 2) }<br><span class="port-amt">${ fornum6(dsu_base, 2) }</span></div>
					<div>$${ fornum6(ds_ctokprice * dsu_ctok, 2) }<br><span class="port-amt">${ fornum6(dsu_ctok, 2) }</span></div>
					<div>$${ fornum6(ds_wrapprice * dsu_wrap, 2) }<br><span class="port-amt">${ fornum6(dsu_wrap, 2) }</span></div>
					<div>$${ fornum6(ds_wrapprice * dsu_farm, 2) }<br><span class="port-amt">${ fornum6(dsu_farm, 2) }</span></div>
					<div>$${ fornum6(ds_equalprice * dsu_rew0, 2) }<br><span class="port-amt">${ fornum6(dsu_rew0, 2) } <img src="${LOGOS+TEARNED[0].toLowerCase()}.png"></span></div>
					<div>$${ fornum6(ds_equalprice * dsu_tre0, 2) }<br><span class="port-amt">${ fornum6(dsu_tre0, 2) } <img src="${LOGOS+TEARNED[0].toLowerCase()}.png"></span></div>
				</div>
			`;


			dsu_totalbase += ds_wrapprice * dsu_base;
			dsu_totalctok += ds_ctokprice * dsu_ctok;
			dsu_totalwrap += ds_wrapprice * dsu_wrap;
			dsu_totalfarm += ds_wrapprice * dsu_farm;
			dsu_totalrew0 += ds_equalprice * dsu_rew0;
			dsu_totaltre0 += ds_equalprice * dsu_tre0;
			dsu_annualrew += ds_wrapprice * dsu_farm * ds_farmapr / 100 ;

		}


	}

	dsu_totalport = dsu_totalbase + dsu_totalctok + dsu_totalwrap + dsu_totalfarm;
	$("topstat-pools").innerHTML= POOLS.length;
	$("topstat-tvl").innerHTML= "$"+fornum6(ds_totalwrapmktcap,0);
	$("topstat-txs").innerHTML= fornum6(ds_totaltxs,0);

	if(Number(_user)>0x1234) {
		$("portfolio").innerHTML += `
			<div class="hhr"></div>
			<div class="c2a90-row c2a90-row-port port-total">
				<div><button class="submit" style="width:250px;z-index:1;" onclick="claimAllRewards()">Claim All Rewards</div>
				<div></div>
				<div><br>$${ fornum6(dsu_totalbase, 2) }</div>
				<div><br>$${ fornum6(dsu_totalctok, 2) }</div>
				<div><br>$${ fornum6(dsu_totalwrap, 2) }</div>
				<div><br>$${ fornum6(dsu_totalfarm, 2) }</div>
				<div><br>$${ fornum6(dsu_totalrew0, 2) }</div>
				<div><br>$${ fornum6(dsu_totaltre0, 2) }</div>
			</div>
		`;

		$("portstat-total").innerHTML = "$"+ fornum6( dsu_totalport, 2);
		$("portstat-staked").innerHTML = "$"+ fornum6( dsu_totalfarm, 2);
		$("portstat-netapr").innerHTML = fornum6( dsu_annualrew / dsu_totalfarm * 100, 2) + "%";
		$("portstat-earnings").innerHTML = "$"+ fornum6( dsu_totaltre0, 2);
	}
	return;
}


async function arf(){
	let c=0;
	var xfr = setInterval(
		async function(){
			console.log("refreshing stats", new Date(), c );
			try {
				if( ethers.utils.isAddress(window?.ethereum?.selectedAddress) ) {gubs();}
				dexstats()
			}
			catch(e) { console.log('hmm..'); }
			c++;
		},
		16_000
	);
}
async function gubs() {

	return;
}




function drawPie(_pievals, _piecolors) {

	function describeArc(x, y, radius, startAngle, endAngle) {
    	const startX = x + radius * Math.cos(startAngle);
    	const startY = y + radius * Math.sin(startAngle);
    	const endX = x + radius * Math.cos(endAngle);
    	const endY = y + radius * Math.sin(endAngle);

    	const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

    	return [
        	"M", startX, startY,
        	"A", radius, radius, 0, largeArcFlag, 1, endX, endY,
        	"L", x, y,
        	"Z"
    	].join(" ");
	}

    const total = _pievals.reduce((sum, value) => sum + value, 0);
    const radius = 50;
    const cx = 50;
    const cy = 50;

    let startAngle = -Math.PI/2;
    const paths = _pievals.map((value, index) => {
        const endAngle = startAngle + (value / total) * 2 * Math.PI;
        const path = describeArc(cx, cy, radius, startAngle, endAngle);
        startAngle = endAngle;
        return `<path d="${path}" fill="${_piecolors?_piecolors[index]?_piecolors[index]:getRandomDarkColor():getRandomDarkColor()}" />`;
    }).join('');

    const svg = `
        <svg class="drawPie" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${paths}
        </svg>
    `;

    return svg;
}
function getRandomDarkColor() {
    const h = Math.random() * 360;
    const s = 70 + Math.random() * 30; // 70% to 100%
    const l = 40 + Math.random() * 20; // 40% to 60%
    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l / 100 - c / 2;
    let r, g, b;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    return `rgb(${(r + m) * 255 | 0}, ${(g + m) * 255 | 0}, ${(b + m) * 255 | 0})`;
}



async function claimAllRewards() {
	///_FARM = new ethers.Contract(FARM, LPABI,signer);
	_VOTER = new ethers.Contract(VOTER, ["function claimRewards(address[],address[][])"],signer);

	_earned = [dsu_totalrew0 * 1e18, 0];

	if( _earned.reduce((a,b)=>a+b) == 0 ) {notice(`<h3>You dont have any pending rewards!</h3> Stake some ${WRAP_NAME} to earn more!`); return;}

	notice(`
		<h3>Order Summary</h3>
		<b>Claiming ${TEARNED_NAME.join("+")} rewards</b>
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[0]}"> <b>$${fornum5(_earned[0],18)}</b> ${TEARNED_NAME[0]}
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[1]}"> <b>$${fornum5(_earned[1],18)}</b> ${TEARNED_NAME[1]}
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _VOTER.claimRewards( POOLS.map(i=>i.farmaddr), POOLS.map(i=>TEARNED), {gasLimit:BigInt( POOLS.length * 800_000 )});
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<b>Claiming ${TEARNED_NAME.join("+")} rewards</b>
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[0]}"> <b>${fornum5(_earned[0],18)}</b> ${TEARNED_NAME[0]}
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[1]}"> <b>${fornum5(_earned[1],18)}</b> ${TEARNED_NAME[1]}
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<b>Claiming ${TEARNED_NAME.join("+")} rewards</b>
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[0]}"> <b>${fornum5(_earned[0],18)}</b> ${TEARNED_NAME[0]}
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[1]}"> <b>${fornum5(_earned[1],18)}</b> ${TEARNED_NAME[1]}
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}