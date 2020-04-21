const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()
const fetch = require('node-fetch')
const base64 = require('base-64')

let username = "";
let password = "";
let token = "";

async function getToken () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'Authorization': 'Basic '+ base64.encode(username + ':' + password)},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/login',request)
  const serverResponse = await serverReturn.json()
  token = serverResponse.token

  return token;
}

async function getCategory () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/categories',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function getTags (category) {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/categories/' + category + '/tags',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function getCart () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/products', request)
  const serverResponse = await serverReturn.json()
  return serverResponse;
}

async function getProducts () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/products',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function getReviews (productID) {
  
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu//products/' + productID + '/reviews',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function getTagsNoCate () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/tags',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function postTags (tag) {
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags/' + tag,request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}


async function getApplicationTags () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function removeTags (tag) {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags/' + tag,request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function getUserTags () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/tags/',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function postCart (productID) {
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/products/' + productID,request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function removeCart (productID) {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/products/' + productID,request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function getPage () {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function getSpecificPage (page) {
  let request = {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/' + page,request)
  const serverResponse = await serverReturn.json()

  return serverResponse;

}


async function postPage (page) {
  let obj = {}
  obj.page = page;
  let request = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    body: JSON.stringify(obj),
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;

}

async function postBack (isBack) {
  let obj = {}
  obj.back = isBack;
  let request = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    body: JSON.stringify(obj),
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;

}

async function userMessage (message) {
  let obj = {}
  obj.isUser = true;
  obj.text = message;
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    body: JSON.stringify(obj),
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/messages',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

async function agentMessage (message) {
  let obj = {}
  obj.isUser = false;
  obj.text = message;
  let request = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    body: JSON.stringify(obj),
    redirect: 'follow'
  }
 
  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/messages',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;

}

async function deleteMessage () {
  let request = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
              'x-access-token': token},
    redirect: 'follow'
  }

  const serverReturn = await fetch('https://mysqlcs639.cs.wisc.edu/application/messages',request)
  const serverResponse = await serverReturn.json()
  

  return serverResponse;
}

app.get('/', (req, res) => res.send('online'))
app.post('/', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  async function welcome () {
    agent.add('Webhook works!')
    await agentMessage('Webhook works!')
  }

  async function checkCategory() {
    let categoryList = await getCategory()
    categoryList = categoryList.categories
    let categoryString = "We have the following products: ";
    categoryString += categoryList.join(', ');
    categoryString +=".";
    agent.add(categoryString)
    await agentMessage(categoryString)
  }
   
  async function checkTags() {
    let currCategory = agent.parameters.category
    await userMessage(agent.query)
    let str = agent.query; 
    let tagsList = await getTags(currCategory)
    console.log(tagsList)
    tagsList = tagsList.tags
    if (typeof tagsList === 'undefined') {
      agent.add("Sorry cannot find any types under the category you provided. Please try again!")
      await agentMessage("Sorry cannot find any types under the category you provided. Please try again!")
    } else {
      let tagString = "We have the following types for the " + currCategory + ": ";
      tagString += tagsList.join(', ');
      tagString += "."
      agent.add(tagString)
      await agentMessage(tagString)
    }
    
  }

  async function checkCart() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    let cartList = await getCart()
    cartList = cartList.products
    let totalPrice = 0;
    let numItem = 0;
    let cartString = "";
    if (typeof cartList === 'undefined') {
      agent.add("Sorry nothing found in your cart. Please try again!")
      await agentMessage("Sorry nothing found in your cart. Please try again!")
    } else {
      for (let index in cartList){
        let currItem = cartList[index]
        totalPrice += currItem.price * currItem.count;
        numItem += currItem.count;
        cartString += currItem.count + " " +  currItem.name + ", ";
      }
      cartString = cartString.substring(0, cartString.length - 2);
      cartString = "You have added " + numItem + " items to the cart which are " + totalPrice  + " dollars. " + "The detail product list are: " + cartString + ".";
      agent.add(cartString)
      await agentMessage(cartString)
    }
    
  }

  async function getProductInfo(userProduct, productID) {
    let productsList = await getProducts()
    productsList = productsList.products
    
    
    if (typeof productsList === 'undefined') {
      agent.add("Sorry we don't have any products in our database!")
      await agentMessage("Sorry we don't have any products in our database!")
    } else {
      let resultProduct = ""
      for (let currentProduct of productsList) {
        console.log(productID)
        console.log(currentProduct.id)
        if (userProduct === currentProduct.name || productID === currentProduct.id) {
          resultProduct = currentProduct
        }
      }
      if (resultProduct === "") {
        agent.add("Sorry we could not find the product that you are talking about. Please try it again!")
        await agentMessage("Sorry we could not find the product that you are talking about. Please try it again!")
      } else {
        
        let productInfoString = "The price for " + resultProduct.name + " is " + resultProduct.price + " dollars.";
        productInfoString += "The description for the product is: " + resultProduct.description + " ";
        
        let reviewList = await getReviews(resultProduct.id)
        reviewList = reviewList.reviews
        if (typeof reviewList === 'undefined') {
          agent.add(productInfoString)
          await agentMessage(productInfoString)
        } else {
          let totalScore = 0;
          let numReview = 0;
          for (let currReview of reviewList) {
            numReview += 1
            totalScore += currReview.stars
          }
          productInfoString += "There are " + numReview + " reviews of this product which has a average ratings of " + totalScore/numReview + " stars."
          agent.add(productInfoString)
          await agentMessage(productInfoString)
        }
      }
    }
  }

  async function checkProductInfo() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    await userMessage(agent.query)
    await getProductInfo(agent.parameters.productItem, -1)
    
  }

  async function getReview(userProduct, productID) {
    let productsList = await getProducts()
    productsList = productsList.products
    
    if (typeof productsList === 'undefined') {
      agent.add("Sorry we don't have any products in our database!")
      await agentMessage("Sorry we don't have any products in our database!")
    } else {
      let resultProduct = ""
      for (let currentProduct of productsList) {
        
        if (userProduct === currentProduct.name || productID === currentProduct.id) {
          resultProduct = currentProduct
        }
      }
      if (resultProduct === "") {
        agent.add("Sorry we could not find the product that you are talking about. Please try it again!")
        await agentMessage("Sorry we could not find the product that you are talking about. Please try it again!")
      } else {
        let reviewList = await getReviews(resultProduct.id)
        reviewList = reviewList.reviews
        if (typeof reviewList === 'undefined') {
          agent.add("Sorry there is not review for " + resultProduct.name + " .")
          await agentMessage("Sorry there is not review for " + resultProduct.name + " .")
        } else {
          let tempReviewString = ""
          let totalScore = 0;
          let numReview = 0;
          for (let currReview of reviewList) {
            numReview += 1
            totalScore += currReview.stars
            tempReviewString += "Title is " + currReview.title + " which talks about "
            tempReviewString += currReview.text + ", "
          }

          tempReviewString = "There are " + numReview + " reviews of this product which has a average ratings of " + totalScore/numReview + " stars. The details review are following: " + tempReviewString.substring(0, tempReviewString.length - 2) + ""
          agent.add(tempReviewString)
          await agentMessage(tempReviewString)
        }
      }
    }
  }

  async function checkReview() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }

    await userMessage(agent.query)
    await getReview(agent.parameters.productItem, -1)
  }

  async function narrowTag() {
    let userTag = agent.parameters.tag
    await userMessage(agent.query)
    await getToken()
    if (typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    let tagsList = await getTagsNoCate()
   
    tagsList = tagsList.tags
   
    
    if (typeof tagsList === 'undefined') {
      agent.add("Sorry we don't have any tags from our Database.")
      await agentMessage("Sorry we don't have any tags from our Database.")
    } else {
      let findTag = ""
      for (let currTag of tagsList) {
        if (userTag === currTag) {
          findTag = currTag
        }
      }
      if (findTag === "") {
        agent.add("Sorry we could find your tag. Could you please say that again?")
        await agentMessage("Sorry we could find your tag. Could you please say that again?")
      } else {
        await postTags(userTag)
        agent.add("I have added the tag " + userTag + " to current category.")
        await agentMessage("I have added the tag " + userTag + " to current category.")
      }
    }
  }
  
  async function removeTag() {
    let userTag = agent.parameters.tag
    await userMessage(agent.query)
    await getToken()
    if (typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    let tagsList = await getApplicationTags()
   
    tagsList = tagsList.tags
   
    
    if (typeof tagsList === 'undefined') {
      agent.add("Sorry you did not select any tags")
      await agentMessage("Sorry you did not select any tags")
    } else {
      let findTag = ""
      for (let currTag of tagsList) {
        if (userTag === currTag) {
          findTag = currTag
        }
      }
      if (findTag === "") {
        agent.add("Sorry it seems you did not select this tag. Could you please say that again?")
        await agentMessage("Sorry it seems you did not select this tag. Could you please say that again?")
      } else {
        await removeTags(userTag)
        agent.add("I have removed the tag " + userTag + " from your current category.")
        await agentMessage("I have removed the tag " + userTag + " from your current category.")
      }
    }
  }

  

  async function addToCartHelper(userProduct, productID) {
    if (typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    } else {
      let productsList = await getProducts()
      productsList = productsList.products
      
      if (typeof productsList === 'undefined') {
        agent.add("Sorry we don't have any products in our database!")
        await agentMessage("Sorry we don't have any products in our database!")
      } else {
        let resultProduct = ""
        for (let currentProduct of productsList) {
          if (userProduct === currentProduct.name || productID === currentProduct.id) {
            resultProduct = currentProduct
          }
        }
        if (resultProduct === "") {
          agent.add("Sorry we could not find the product that you are talking about. Please try it again!")
          await agentMessage("Sorry we could not find the product that you are talking about. Please try it again!")
        } else {
          if (agent.parameters.number === "" || typeof agent.parameters.number === 'undefined') {
            await postCart(resultProduct.id)
            agent.add("I have sucessfully added 1 " + resultProduct.name+ " to your cart!")
            await agentMessage("I have sucessfully added 1 " + resultProduct.name+ " to your cart!")
          } else {
            for (let i = 0; i < agent.parameters.number; i++) {
              await postCart(resultProduct.id)
            }
            agent.add("I have sucessfully added " + agent.parameters.number + " " + resultProduct.name+ " to your cart!")
            await agentMessage("I have sucessfully added " + agent.parameters.number + " " + resultProduct.name+ " to your cart!")
          }
        }
      }

    }
  }

  async function addToCart() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }

    await userMessage(agent.query)   
    await addToCartHelper( agent.parameters.productItem, -1)
   
  }

  async function removeFromCartHelper(userProduct, productID) {
    let productsList = await getProducts()
    productsList = productsList.products
    
    if (typeof productsList === 'undefined') {
      await agentMessage("Sorry we don't have any products in our database!")
      agent.add("Sorry we don't have any products in our database!")
    } else {
      let resultProduct = ""
      for (let currentProduct of productsList) {
        if (userProduct === currentProduct.name || productID === currentProduct.id) {
          resultProduct = currentProduct
        }
      }
      
      if (resultProduct === "") {
        agent.add("Sorry we could not find the product that you are talking about. Please try it again!")
        await agentMessage("Sorry we could not find the product that you are talking about. Please try it again!")
      } else {
        let cartTotal = 0;
        let cartList = await getCart()
        cartList = cartList.products
        if (typeof cartList === 'undefined') {
          agent.add("Sorry I cannot find your cart. Please try again!")
          await agentMessage("Sorry I cannot find your cart. Please try again!")
        } else {
          for (let index in cartList){
            let currItem = cartList[index]
            if (currItem.name === resultProduct.name) {
              cartTotal += currItem.count;
            }
          }
        }
        if (cartTotal == 0) {
          await agentMessage("Sorry there are no " + resultProduct.name + " in your cart. Please try it again.")
          return agent.add("Sorry there are no " + resultProduct.name + " in your cart. Please try it again.")
        }
        if (agent.parameters.number === "" || typeof agent.parameters.number === 'undefined') {
          await removeCart(resultProduct.id)
          return agent.add("I have sucessfully removed 1 " + resultProduct.name+ " from your cart!")
        } else {
          if (agent.parameters.number > cartTotal) {
            await agentMessage("There are only " + cartTotal + " in your cart. Please try it again.")
            return agent.add("There are only " + cartTotal + " in your cart. Please try it again.")
          } else {
            for (let i = 0; i < agent.parameters.number; i++) {
              await removeCart(resultProduct.id)
            }
            await agentMessage("I have sucessfully removed " + agent.parameters.number + " " + resultProduct.name + " from your cart!")
            agent.add("I have sucessfully removed " + agent.parameters.number + " " + resultProduct.name + " from your cart!")
          }
          
        }
      }
    }

  }

  async function removeFromCart() {
   
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    } 
    await userMessage(agent.query)
    await removeFromCartHelper(agent.parameters.productItem, -1);


  }

  async function login () {
    // You need to set this from `username` entity that you declare in DialogFlow
    username = agent.parameters.username
    // You need to set this from password entity that you declare in DialogFlow
    password = agent.parameters.password
    await getToken()
    await deleteMessage()
    await userMessage(agent.query)
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry you password or username may not be correct.")
      return agent.add("Sorry you password or username may not be correct.")
    } 
    await agentMessage("Welcome " + username + " !!!")
    agent.add("Welcome " + username + " !!!")


    


  }
  
  async function reviewCart() {

    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
   
    let cartList = await getCart()
    cartList = cartList.products
    if (typeof cartList === 'undefined') {
      await agentMessage("Sorry nothing found in your cart. Please try again!")
      agent.add("Sorry nothing found in your cart. Please try again!")
    } else {
      if (cartList.length == 0) {
        await agentMessage("Sorry it seems you don't have any product in your cart.")
        agent.add("Sorry it seems you don't have any product in your cart.")
      } else {
        await postPage("/" + username + "/cart-review",false)
        await agentMessage("You are now viewing the cart review page")
        agent.add("You are now viewing the cart review page")
      }
    }
  }

  async function confirmCart() {

    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
   
    
    await postPage("/" + username + "/cart-confirmed")
    await agentMessage("You are now viewing the cart confirm page")
    agent.add("You are now viewing the cart confirm page")
      
  }
  
  async function goPage () {
   
    let userTarget = agent.parameters.PageObject
    await userMessage(agent.query)
    if (userTarget === "welcome") {
      await postPage("/")
      await agentMessage("You are now view the welcome page of WiscShop!")
      return agent.add("You are now view the welcome page of WiscShop!")
    } 
    else {
      await getToken()
      if (token === "" || typeof token === 'undefined') {
        await agentMessage("Sorry I cannot do it. Can you log in?")
        return agent.add("Sorry I cannot do it. Can you log in?")
      }
  
      if (userTarget === "Sign Up") {
        await postPage("/signUp")
        await agentMessage("You are now view the sign up page of WiscShop!")
        agent.add("You are now view the sign up page of WiscShop!")
      }
      else if (userTarget === "Log In") {
        await postPage("/signIn")
        await agentMessage("You are now view the sign in page of WiscShop!")
        agent.add("You are now view the sign in page of WiscShop!")
      }
      else if (userTarget === "home" || userTarget === "category") {
        await postPage("/" + username )
        await agentMessage("You are now view the welcome page for " + username + " !")
        agent.add("You are now view the welcome page for " + username + " !")
      }
      else if (userTarget === "cart") {
        await postPage("/" + username + "/cart")
        await agentMessage("You are now view the cart page for " + username + " !")
        agent.add("You are now view the cart page for " + username + " !")
      }
      else {
        let categoryList = await getCategory()
        categoryList = categoryList.categories
        if (categoryList.includes(userTarget)) {
          await postPage("/" + username + "/" + userTarget)
          await agentMessage("You are now viewing the " + userTarget + " page!")
          agent.add("You are now viewing the " + userTarget + " page!")
        } else {
          let productsList = await getProducts()
          productsList = productsList.products
          let resultProduct = "";
          for (let currentProduct of productsList) {
        
            if (userTarget === currentProduct.name) {
              resultProduct = currentProduct
            }
          }
          if (resultProduct !== "") {
            await postPage("/" + username + '/' + resultProduct.category + "/products/" + resultProduct.id)
            await agentMessage("You are now viewing the " + resultProduct.name + " product page!")
            agent.add("You are now viewing the " + resultProduct.name + " product page!")
          } else {
            await agentMessage("Sorry, I cannot find the page you are looking for. Please try it again.")
            agent.add("Sorry, I cannot find the page you are looking for. Please try it again.")
          }
        }

      }
    }
  }

  async function getNaturalProduct() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    await userMessage(agent.query)
    if (page.length === 5) {
      productCheck = page[page.length - 2]
      itemID = page[page.length - 1]
      itemID = Number(itemID)
      if (productCheck === "products") {
        
        await getProductInfo("", itemID)
      } else {
        await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
        return agent.add("Sorry I cannot any product on your current page. Please try it again.")
      }
      
    } else {
      await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
      return agent.add("Sorry I cannot any product on your current page. Please try it again.")
    }
    

  }

  async function getNaturalReview() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    await userMessage(agent.query)
    if (page.length === 5) {
      productCheck = page[page.length - 2]
      itemID = page[page.length - 1]
      itemID = Number(itemID)
      if (productCheck === "products") {
        
        await getReview("", itemID)
      } else {
        await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
        return agent.add("Sorry I cannot any product on your current page. Please try it again.")
      }
      
    } else {
      await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
      return agent.add("Sorry I cannot any product on your current page. Please try it again.")
    }
  }
  
  async function getNaturalAddCart() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    await userMessage(agent.query)
    if (page.length === 5) {
      productCheck = page[page.length - 2]
      itemID = page[page.length - 1]
      itemID = Number(itemID)
      if (productCheck === "products") {
        
        await addToCartHelper("", itemID)
      } else {
        await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
        return agent.add("Sorry I cannot any product on your current page. Please try it again.")
      }
      
    } else {
      await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
      return agent.add("Sorry I cannot any product on your current page. Please try it again.")
    }
  }


  async function getNaturalShowPage() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    await userMessage(agent.query)
    let userTarget = agent.parameters.ordinal;
    userTarget = userTarget - 1;
    let categoryList = await getCategory()
    categoryList = categoryList.categories
    if (page.length === 2) {
      if (userTarget >= 0 && userTarget < categoryList.length ) {
        await postPage("/" + username + "/" + categoryList[userTarget])
        await agentMessage("You are now viewing the " + categoryList[userTarget] + " page!")
        agent.add("You are now viewing the " + categoryList[userTarget] + " page!")
      } else {
        await agentMessage("Sorry we cannot find the page that you plan to visit. Please try it again.")
        agent.add("Sorry we cannot find the page that you plan to visit. Please try it again.")
      }
    } 
    else if (page.length === 3 && page[2] === "cart") {
      let cartList = await getCart()
      cartList = cartList.products
      if (typeof cartList === 'undefined') {
        await agentMessage("Sorry nothing found in your cart. Please try again!")
        agent.add("Sorry nothing found in your cart. Please try again!")
      } else {
        if (cartList.length == 0) {
          await agentMessage("Sorry it seems you don't have any product in your cart.")
          agent.add("Sorry it seems you don't have any product in your cart.")
        } else {
          if (userTarget >= 0 && userTarget < cartList.length ) {
            let currItem = cartList[userTarget]
            await postPage("/" + username + "/" + currItem.category + "/products/" + currItem.id)
            await agentMessage("You are now viewing the " + currItem.name + " page!")
            agent.add("You are now viewing the " + currItem.name + " page!")
          } else {
            await agentMessage("Sorry we cannot find the page that you plan to visit. Please try it again.")
            agent.add("Sorry we cannot find the page that you plan to visit. Please try it again.")
          }
        }
      }
    } 
    else if (page.length === 3 && categoryList.includes(page[2])) {
      let tagList = await getUserTags();
      tagList = tagList.tags;
      let tagString = tagList.join(",")
      let categoryType = page[2];
      let searchString = "products/" + "?tags=" + tagString + "&category=" + categoryType;
      let itemList = await getSpecificPage(searchString);
      itemList = itemList.products; 
      if (userTarget >= 0 && userTarget < itemList.length ) {
        let currItem = itemList[userTarget];
        await postPage("/" + username + "/" + currItem.category + "/products/" + currItem.id)
        await agentMessage("You are now viewing the " + currItem.name + " page!")
        agent.add("You are now viewing the " + currItem.name + " page!")
      } else {
        await agentMessage("Sorry we cannot find the page that you plan to visit. Please try it again.")
        agent.add("Sorry we cannot find the page that you plan to visit. Please try it again.")
      }
    } else {
      await agentMessage("Sorry we cannot find the page that you plan to visit. Please try it again.")
      agent.add("Sorry we cannot find the page that you plan to visit. Please try it again.")
    }
  }


  async function getNaturalAddThisCart() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    await userMessage(agent.query)
    let userTarget = agent.parameters.ordinal;
    userTarget = userTarget - 1;
    let categoryList = await getCategory()
    categoryList = categoryList.categories
    if (page.length === 3 && categoryList.includes(page[2])) {
      let tagList = await getUserTags();
      tagList = tagList.tags;
      let tagString = tagList.join(",")
      let categoryType = page[2];
      let searchString = "products/" + "?tags=" + tagString + "&category=" + categoryType;
      let itemList = await getSpecificPage(searchString);
      itemList = itemList.products; 
      if (userTarget >= 0 && userTarget < itemList.length ) {
        await addToCartHelper( "", itemList[userTarget].id)
      } else {
        await agentMessage("Sorry we cannot find the page that you plan to visit. Please try it again.")
        agent.add("Sorry we cannot find the page that you plan to visit. Please try it again.")
      }  
    } else {
      await agentMessage("Sorry we cannot do that for you. Please try it again.")
      agent.add("Sorry we cannot do that for you. Please try it again.")
    }
  }

  async function getNaturalRemoveThisCart() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    await userMessage(agent.query)
    let userTarget = agent.parameters.ordinal;
    userTarget = userTarget - 1;
    let categoryList = await getCategory()
    categoryList = categoryList.categories
    if (page.length === 3 && categoryList.includes(page[2])) {
      let tagList = await getUserTags();
      tagList = tagList.tags;
      let tagString = tagList.join(",")
      let categoryType = page[2];
      let searchString = "products/" + "?tags=" + tagString + "&category=" + categoryType;
      let itemList = await getSpecificPage(searchString);
      itemList = itemList.products; 
      if (userTarget >= 0 && userTarget < itemList.length ) {
        await removeFromCartHelper( "", itemList[userTarget].id)
      } else {
        await agentMessage("Sorry we cannot find the page that you plan to visit. Please try it again.")
        agent.add("Sorry we cannot find the page that you plan to visit. Please try it again.")
      }  
    } else {
      await agentMessage("Sorry we cannot do that for you. Please try it again.")
      agent.add("Sorry we cannot do that for you. Please try it again.")
    }
  }

  async function getNaturalTag() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    await userMessage(agent.query)
    let categoryList = await getCategory()
    categoryList = categoryList.categories
    if (page.length === 3 && categoryList.includes(page[2])) {
      let tagList = await getTags(page[2])
      tagList = tagList.tags
      let tagString = tagList.join(", ");
      await agentMessage("Here are the tag for the " + page[2] +  " category: " + tagString + ".")
      return agent.add("Here are the tag for the " + page[2] +  " category: " + tagString + ".")
    } else {
      await agentMessage("Sorry I cannot do that for you. Please try it again.")
      return agent.add("Sorry I cannot do that for you. Please try it again.")
    }

  }

  


  async function getNaturalRemoveCart() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")
    }
    let page = await getPage();
    page = page.page;
    page = page.split('/')
    if (page.length === 5) {
      productCheck = page[page.length - 2]
      itemID = page[page.length - 1]
      itemID = Number(itemID)
      if (productCheck === "products") {
        await userMessage(agent.query)
        await removeFromCartHelper("", itemID)
      } else {
        await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
        return agent.add("Sorry I cannot any product on your current page. Please try it again.")
      }
      
    } else {
      await agentMessage("Sorry I cannot any product on your current page. Please try it again.")
      return agent.add("Sorry I cannot any product on your current page. Please try it again.")
    }
  }

  async function goBack() {
    await getToken()
    if (token === "" || typeof token === 'undefined') {
      await agentMessage("Sorry I cannot do it. Can you log in?")
      return agent.add("Sorry I cannot do it. Can you log in?")

    }
    
    await postBack(true)
    await agentMessage("You are now viewing the previous page")
    agent.add("You are now viewing the previous page")
  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  // You will need to declare this `Login` content in DialogFlow to make this work
  intentMap.set('Login', login) 
  intentMap.set('GetCategory', checkCategory) 
  intentMap.set('GetTags', checkTags) 
  intentMap.set('GetCart', checkCart) 
  intentMap.set('GetProductInfo', checkProductInfo)
  intentMap.set('GetReviewInfo', checkReview)
  intentMap.set('NarrowTag', narrowTag)
  intentMap.set('RemoveTag', removeTag)
  intentMap.set('AddToCart', addToCart)
  intentMap.set('RemoveFromCart', removeFromCart)
  intentMap.set('ReviewCart', reviewCart)
  intentMap.set('ConfirmCart', confirmCart)
  intentMap.set('GoPage', goPage)
  intentMap.set('GoBack', goBack)
  intentMap.set('NaturalProductInfo', getNaturalProduct)
  intentMap.set('NaturalProductReview', getNaturalReview)
  intentMap.set('NaturalAddCart', getNaturalAddCart)
  intentMap.set('NaturalRemoveCart', getNaturalRemoveCart)
  intentMap.set('NaturalShowPage', getNaturalShowPage)
  intentMap.set('NaturalAddThisCart', getNaturalAddThisCart)
  intentMap.set('NaturalRemoveThisCart', getNaturalRemoveThisCart)
  intentMap.set('NaturalGetTags', getNaturalTag)
  agent.handleRequest(intentMap)
})

app.listen(process.env.PORT || 8080)
