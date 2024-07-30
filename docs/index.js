
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
    document.getElementsByClassName('tablinks')[0].click();
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
		(Number(window.ethereum.chainId) != null )
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
            		decimals: 18
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

LPABI = ["function balanceOf(address) public view returns(uint)","function metadata() public view returns(uint,uint,uint,uint,bool,address,address)","function getAssetPrice(address) public view returns(uint)","function approve(address,uint)","function allowance(address,address) public view returns(uint)","function earned(address,address) public view returns(uint)","function earnings(address,address) public view returns(uint)","function name() public view returns(string)","function symbol() public view returns(string)","function tvl() public view returns(uint)","function apr() public view returns(uint)","function totalSupply() public view returns(uint)","function deposit(uint)","function withdraw(uint)"]

ELOCKERABI = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "operator","type": "address"},{"indexed": false,"internalType": "bool","name": "approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "by","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "address","name": "pool","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "expiry","type": "uint256"},{"indexed": false,"internalType": "address","name": "agent","type": "address"},{"indexed": false,"internalType": "uint256","name": "percent","type": "uint256"}],"name": "LockCreated","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [],"name": "AprGuru","outputs": [{"internalType": "contract IAprGuru","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "TvlGuru","outputs": [{"internalType": "contract ITvlGuru","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_approved","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "art","outputs": [{"internalType": "contract IArt","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"}],"name": "createLock","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"internalType": "address","name": "_to","type": "address"}],"name": "createLockFor","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct IeLocker.Referral","name": "_ref","type": "tuple"}],"name": "createLockWithReferral","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"internalType": "address","name": "_to","type": "address"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct IeLocker.Referral","name": "_ref","type": "tuple"}],"name": "createLockWithReferralFor","outputs": [{"internalType": "contract IeLocker","name": "_locker","type": "address"},{"internalType": "uint256","name": "_ID","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "design","outputs": [{"internalType": "contract IeLocker","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "factory","outputs": [{"internalType": "contract IFactory","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "feeSynthesizer","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IeLocker","name": "_design","type": "address"},{"internalType": "contract IArt","name": "_art","type": "address"},{"internalType": "contract IVoter","name": "_vtr","type": "address"}],"name": "initialize","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "address","name": "_operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_spender","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "isApprovedOrOwner","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_lockID","type": "uint256"}],"name": "lockInfo","outputs": [{"internalType": "address[7]","name": "","type": "address[7]"},{"internalType": "uint256[11]","name": "","type": "uint256[11]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "contract IERC20[]","name": "_rt","type": "address[]"},{"internalType": "uint256[]","name": "_ra","type": "uint256[]"},{"internalType": "uint256[]","name": "_rd","type": "uint256[]"},{"internalType": "string[]","name": "_rs","type": "string[]"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct IeLocker.Referral","name": "","type": "tuple"},{"internalType": "string[4]","name": "_str","type": "string[4]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_lockID","type": "uint256"}],"name": "lockedAssets","outputs": [{"internalType": "contract IPair","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "lockers","outputs": [{"internalType": "contract IeLocker","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "ownership_change","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "referrals","outputs": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_new_admin","type": "address"}],"name": "setAdmin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_operator","type": "address"},{"internalType": "bool","name": "_approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IAprGuru","name": "_a","type": "address"}],"name": "setAprGuru","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IArt","name": "_art","type": "address"}],"name": "setArt","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IeLocker","name": "_design","type": "address"}],"name": "setDesign","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_fs","type": "address"}],"name": "setFeeSynthesizer","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract ITvlGuru","name": "_t","type": "address"}],"name": "setTvlGuru","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "_interfaceID","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "pure","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_tokenIndex","type": "uint256"}],"name": "tokenOfOwnerByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_usr","type": "address"}],"name": "tokensOfOwner","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "voter","outputs": [{"internalType": "contract IVoter","name": "","type": "address"}],"stateMutability": "view","type": "function"}];

ELOCKSABI = [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "earner","type": "address"},{"indexed": true,"internalType": "contract IERC20","name": "token","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "ClaimRewards","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "depositor","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "total","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "until","type": "uint256"}],"name": "LockStatus","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "token","type": "address"},{"indexed": true,"internalType": "address","name": "agent","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "ReferralPaid","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [],"name": "ID","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "allEarnings","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "string[]","name": "","type": "string[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "apr","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_who","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "claimFees","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"}],"name": "claimFeesTo","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IERC20[]","name": "_tkns","type": "address[]"}],"name": "claimMultipleRewards","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "contract IERC20[]","name": "_tkns","type": "address[]"}],"name": "claimMultipleRewardsTo","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "claimRewards","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"}],"name": "claimRewardsTo","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "claimableFees","outputs": [{"internalType": "uint256","name": "_cf0","type": "uint256"},{"internalType": "uint256","name": "_cf1","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "claimableRewards","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "eLocker","outputs": [{"internalType": "contract IeLockerRoom","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "earner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"name": "earnings","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "expiry","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_date","type": "uint256"}],"name": "extendDate","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "factory","outputs": [{"internalType": "contract IFactory","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "gauge","outputs": [{"internalType": "contract IGauge","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amt","type": "uint256"}],"name": "increaseAmount","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "contract IPair","name": "_lp","type": "address"},{"internalType": "uint256","name": "_exp","type": "uint256"},{"components": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"internalType": "struct eLOCK.Referral","name": "_ref","type": "tuple"}],"name": "initialize","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pool","outputs": [{"internalType": "contract IPair","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "referral","outputs": [{"internalType": "address","name": "agent","type": "address"},{"internalType": "uint256","name": "percent","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amt","type": "uint256"},{"internalType": "uint256","name": "_date","type": "uint256"}],"name": "relock","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "rewardTokens","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "rewardsList","outputs": [{"internalType": "contract IERC20[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "rewardsListLength","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_e","type": "address"}],"name": "setEarner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "staked","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token0","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token1","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "_ts","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "tvl","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "unlockLiquidity","outputs": [{"internalType": "uint256","name": "_ts","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "voter","outputs": [{"internalType": "contract IVoter","name": "","type": "address"}],"stateMutability": "view","type": "function"}];


async function paintStatic() {
	$("headline-props").innerHTML = `
		<img src="${BASE_LOGO}.png">
		${BASE_NAME}
		⇢
		<img src="${MARKET_LOGO}.png">
		${MARKET_NAME}
	`;

	$("deposit-wrapname-1").innerHTML = WRAP_NAME;
	$("deposit-wrapname-2").innerHTML = WRAP_NAME;
	$("deposit-basename-3").innerHTML = BASE_NAME;
	$("deposit-basename-4").innerHTML = BASE_NAME;
	$("deposit-basename-5").innerHTML = BASE_NAME;
	$("deposit-basename-6").innerHTML = BASE_NAME;
	$("deposit-wrapname-7").innerHTML = WRAP_NAME;
	$("deposit-wrapname-8").innerHTML = WRAP_NAME;

	$("stake-wrapname-1").innerHTML = WRAP_NAME;
	$("stake-wrapname-2").innerHTML = WRAP_NAME;

	$("unstake-wrapname-1").innerHTML = WRAP_NAME;
	$("unstake-wrapname-2").innerHTML = WRAP_NAME;
	$("unstake-wrapname-3").innerHTML = WRAP_NAME;

	$("redeem-wrapname-1").innerHTML = WRAP_NAME;
	$("redeem-wrapname-2").innerHTML = WRAP_NAME;
	$("redeem-basename-3").innerHTML = BASE_NAME;

}

async function dexstats() {

	_BASE = new ethers.Contract(BASE, LPABI, provider);
	_WRAP = new ethers.Contract(WRAP, LPABI, provider);
	_FARM = new ethers.Contract(FARM, LPABI, provider);
	_ds = await Promise.all([
		_BASE.totalSupply(),
		_WRAP.totalSupply(),
		_FARM.getAssetPrice(WRAP),
		_FARM.tvl(),
		_FARM.apr(),
	])

	$("topstat-apr").innerHTML = (Number(_ds[4])/1e18).toLocaleString(undefined,{maximumFractionDigits:2}) + "%"
	$("topstat-tvl").innerHTML = "$" + (Number(_ds[1])/1e18*Number(_ds[2])/1e18).toLocaleString(undefined,{maximumFractionDigits:2})
	$("topstat-dom").innerHTML = ((Number(_ds[1])/1e18)/(Number(_ds[0])/1e18)*100).toLocaleString(undefined,{maximumFractionDigits:4}) + "%"


	$("stake-tvl").innerHTML = "$" + (Number(_ds[3])/1e18).toLocaleString(undefined,{maximumFractionDigits:2}) + " in Total Deposits";
	//$("farm-apr").innerHTML = (Number(_ds[4])/1e18).toLocaleString(undefined,{maximumFractionDigits:2});

	for(i=0;i<TEARNED.length;i++) {
		$("claim-info").innerHTML += `
			<div><img height="20px" src="${LOGOS+TEARNED[i].toLowerCase()}.png" style="vertical-align:middle;"/> ${TEARNED_NAME[i]}</div>
            <div class="hint"id="claim-${i}-old">Claimed: 0.000000000000000000</div>
            <div class="hint"id="claim-${i}-pen">Pending: 0.000000000000000000</div>
            <div class="hint"id="claim-${i}-tot">Total: 0.000000000000000000</div>
            <br><br>
		`;
	}
	return;

}


async function arf(){
	let c=0;
	var xfr = setInterval(
		async function(){
			console.log("refreshing farm stats", new Date(), c );
			try { if( ethers.utils.isAddress(window?.ethereum?.selectedAddress) ) {gubs();} }
			catch(e) { console.log('hmm..'); }
			c++;
		},
		16_000
	);
}
async function gubs() {

	_BASE = new ethers.Contract(BASE, LPABI, signer);
	_WRAP = new ethers.Contract(WRAP, LPABI, signer);
	_FARM = new ethers.Contract(FARM, LPABI, signer);

	_ubs = await Promise.all([
		_BASE.balanceOf(window.ethereum.selectedAddress),
		_WRAP.balanceOf(window.ethereum.selectedAddress),
		_FARM.balanceOf(window.ethereum.selectedAddress),
		_FARM.earned(TEARNED[0], window.ethereum.selectedAddress),
		_FARM.earnings(window.ethereum.selectedAddress, TEARNED[0]),
		_FARM.earned(TEARNED[1], window.ethereum.selectedAddress),
		_FARM.earnings(window.ethereum.selectedAddress, TEARNED[1]),
	]);
	$("mint-bal").innerHTML		=	"Balance: " + (Number(_ubs[0])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("redeem-bal").innerHTML	=	"Balance: " + (Number(_ubs[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("stake-bal").innerHTML	=	"Balance: " + (Number(_ubs[1])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("unstake-bal").innerHTML	=	"Balance: " + (Number(_ubs[2])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});

	$("claim-0-old").innerHTML	=	"Claimed: " +	(Number(_ubs[4])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("claim-0-pen").innerHTML	=	"Pending: " +	(Number(_ubs[3])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("claim-0-tot").innerHTML	=	"Total: " +		(Number(_ubs[3])/1e18+Number(_ubs[4])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});

	$("claim-1-old").innerHTML	=	"Claimed: " +	(Number(_ubs[6])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("claim-1-pen").innerHTML	=	"Pending: " +	(Number(_ubs[5])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});
	$("claim-1-tot").innerHTML	=	"Total: " +		(Number(_ubs[5])/1e18+Number(_ubs[6])/1e18).toLocaleString(undefined,{maximumFractionDigits:18});

	return;
}










async function mint(ismax) {
	_BASE = new ethers.Contract(BASE, LPABI, signer);
	_WRAP = new ethers.Contract(WRAP, LPABI, signer);
	_DEPOSITOR = new ethers.Contract(DEPOSITOR, LPABI, signer);

	al = await Promise.all([
		_BASE.allowance(window.ethereum.selectedAddress, DEPOSITOR),
		_BASE.balanceOf(window.ethereum.selectedAddress)
	]);

	_oamt = null;

	if(ismax) {
		_oamt = al[1];
	}

	else {
		_oamt = $("mint-amt").value;
		if(!isFinite(_oamt) || _oamt<1/1e18){notice(`Invalid ${BASE_NAME} amount!`); return;}
		_oamt = BigInt(Math.floor(_oamt * 1e18))
	}

	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Amount:</h3>${_oamt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${BASE_NAME}.`);return;}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${BASE_NAME} allowance.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _BASE.approve(DEPOSITOR,_oamt);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ${BASE_NAME} granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>Minting ${WRAP_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} to Deposit: <b>${fornum5(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Expected: <b>${fornum5(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _DEPOSITOR.deposit(_oamt);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<h4>Minting ${WRAP_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Depositing: <b>${fornum5(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Expecting: <b>${fornum5(_oamt,18)}</b><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Deposited: <b>${fornum5(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Received: <b>${fornum5(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}

async function redeem(ismax) {
	_DEPOSITOR = new ethers.Contract(DEPOSITOR, LPABI, signer);

	al = await Promise.all([
		_WRAP.allowance(window.ethereum.selectedAddress, DEPOSITOR),
		_WRAP.balanceOf(window.ethereum.selectedAddress)
	]);

	_oamt = null;

	if(ismax) {
		_oamt = al[1];
	}

	else {
		_oamt = $("redeem-amt").value;
		if(!isFinite(_oamt)){notice(`Invalid ${WRAP_NAME} amount!`); return;}
		_oamt = BigInt(Math.floor(_oamt * 1e18))
	}

	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Amount:</h3>${Number(_oamt)/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${WRAP_NAME}.`);return;}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${WRAP_NAME} allowance.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _WRAP.approve(DEPOSITOR,_oamt);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ${WRAP_NAME} granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>Redeeming ${WRAP_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} to Redeem: <b>${fornum5(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Expected: <b>${fornum5(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _DEPOSITOR.withdraw(_oamt);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<h4>Redeeming ${WRAP_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Redeeming: <b>${fornum5(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Expecting: <b>${fornum5(_oamt,18)}</b><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Redeemed: <b>${fornum5(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Received: <b>${fornum5(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}

async function stake(ismax) {
	_BASE = new ethers.Contract(BASE, LPABI, signer);
	_WRAP = new ethers.Contract(WRAP, LPABI, signer);
	_FARM = new ethers.Contract(FARM, LPABI, signer);

	al = await Promise.all([
		_WRAP.allowance(window.ethereum.selectedAddress, FARM),
		_WRAP.balanceOf(window.ethereum.selectedAddress)
	]);

	_oamt = null;

	if(ismax) {
		_oamt = al[1];
	}

	else {
		_oamt = $("stake-amt").value;
		if(!isFinite(_oamt) || _oamt<1/1e18){notice(`Invalid ${BASE_NAME} amount!`); return;}
		_oamt = BigInt(Math.floor(_oamt * 1e18))
	}


	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Balance!</h2><h3>Desired Amount:</h3>${_oamt/1e18}<br><h3>Actual Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or accumulate some more ${WRAP_NAME}.`);return}

	if(Number(_oamt)>Number(al[0])){
		notice(`
			<h3>Approval required</h3>
			Please grant ${WRAP_NAME} allowance.<br><br>
			<h4><u><i>Confirm this transaction in your wallet!</i></u></h4>
		`);
		let _tr = await _WRAP.approve(FARM,_oamt);
		console.log(_tr);
		notice(`
			<h3>Submitting Approval Transaction!</h3>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
		`);
		_tw = await _tr.wait()
		console.log(_tw)
		notice(`
			<h3>Approval Completed!</h3>
			<br>Spending rights of ${Number(_oamt)/1e18} ${WRAP_NAME} granted.<br>
			<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
			<br><br>
			Please confirm the next step with your wallet provider now.
		`);
	}

	notice(`
		<h3>Order Summary</h3>
		<b>Staking ${WRAP_NAME}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} to Stake: <b>${fornum5(_oamt,18)}</b><br>
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _FARM.deposit(_oamt);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<h4>Staking ${WRAP_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Staking: <b>${fornum5(_oamt,18)}</b><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${WRAP_NAME} Staked: <b>${fornum5(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}

async function unstake(ismax) {
	_FARM = new ethers.Contract(FARM, LPABI,signer);

	al = await Promise.all([
		_FARM.balanceOf(window.ethereum.selectedAddress)
	]);

	_oamt = null;

	if(ismax) {
		_oamt = al[0];
	}
	else {
		_oamt = $("unstake-amt").value;
		if(!isFinite(_oamt)){notice(`Invalid ${WRAP_NAME} amount!`); return;}
		_oamt = BigInt(Math.floor(_oamt * 1e18));
	}

	if(Number(_oamt)>Number(al[1])) {notice(`<h2>Insufficient Staked Balance!</h2><h3>Desired Amount:</h3>${Number(_oamt)/1e18}<br><h3>Actual Staked Balance:</h3>${al[1]/1e18}<br><br><b>Please reduce the amount and retry again, or Stake some more ${WRAP_NAME}.`); return}

	notice(`
		<h3>Order Summary</h3>
		<b>Redeeming ${WRAP_NAME}</b><br>

		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} to Redeem: <b>${fornum5(_oamt,18)}</b><br>
		<img style='height:20px;position:relative;top:4px' src="${BASE_LOGO}"> ${BASE_NAME} Expected: <b>${fornum5(_oamt,18)}</b><br>

		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _FARM.withdraw(_oamt);
	console.log(_tr);
	notice(`
		<h3>Order Submitted!</h3>
		<h4>Unstaking ${WRAP_NAME}</h4>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Unstaking: <b>${fornum5(_oamt,18)}</b><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	_tw = await _tr.wait();
	console.log(_tw)
	notice(`
		<h3>Order Completed!</h3>
		<img style='height:20px;position:relative;top:4px' src="${WRAP_LOGO}"> ${WRAP_NAME} Unstaked: <b>${fornum5(_oamt,18)}</b><br>
		<br><br>
		<h4><a target="_blank" href="${EXPLORE}/tx/${_tr.hash}">View on Explorer</a></h4>
	`);
	gubs();
}

async function claim() {
	_FARM = new ethers.Contract(FARM, LPABI,signer);
	_VOTER = new ethers.Contract(VOTER, ["function claimRewards(address[],address[][])"],signer);

	_earned = await Promise.all([
		_FARM.earned(TEARNED[0], window.ethereum.selectedAddress),
		_FARM.earned(TEARNED[1], window.ethereum.selectedAddress),
	]);

	if(Number(_earned[0]) == 0 && Number(_earned[1]) == 0 ) {notice(`<h3>You dont have any pending rewards!</h3> Stake some ${WRAP_NAME} to earn more!`); return;}

	notice(`
		<h3>Order Summary</h3>
		<b>Claiming ${TEARNED_NAME.join("+")} rewards</b>
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[0]}"> <b>${fornum5(_earned[0],18)}</b> ${TEARNED_NAME[0]}
		<br><img style='height:20px;position:relative;top:4px' src="${TEARNED_LOGO[1]}"> <b>${fornum5(_earned[1],18)}</b> ${TEARNED_NAME[1]}
		<h4><u><i>Please Confirm this transaction in your wallet!</i></u></h4>
	`);
	let _tr = await _VOTER.claimRewards([FARM],[TEARNED],{gasLimit:BigInt(1_500_000)});
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