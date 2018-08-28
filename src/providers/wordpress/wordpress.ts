import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../envrionment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class WordpressProvider {
  api_url = environment.site_url+environment.data_url;
  api_url_create_post = environment.site_url+environment.posts_url;
  api_url_create_product = environment.site_url+environment.products_url;
  api_url_order = environment.site_url+environment.orders_url;
  api_url_report = environment.site_url+environment.reports_url;
  imageData;
  
  constructor(public http: HttpClient) {
    console.log('Hello PostsProvider Provider');
   
  }

  getRecentPosts(categoryId:number, page:number = 1){
    //if we want to query posts by category
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      this.api_url + 'posts?page=' + page
      + category_url);
  }
  
  getPosts(page:number = 1){
    return this.http.get(this.api_url+'posts?page=' + page);
  }
  
 
  getComments(postId:number, page:number = 1){
    return this.http.get(
     this.api_url
      + "comments?post=" + postId
      + '&page=' + page);
  }

  getAuthor(author){
      return this.http.get(this.api_url + "users/" + author);
  }

  getPostCategories(post){
    let observableBatch = [];

    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });

    return Observable.forkJoin(observableBatch);
  }

  getCategory(category){
    return this.http.get(this.api_url + "categories/" + category);
  }
  
  createPost(title, content){
    let data = {
      title: title,
      content: content,
     
      status: 'publish'
    };
    console.log(data);

    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.api_url_create_post, data, {headers: headers});
  }
  
  editPost(post:any, id:number){
	
	console.log(post);
	
    let datapost = {
      title:  post.postname,
     
      content:  post.postdescription,
     
      status: 'publish'
    };
    console.log(post);

    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.api_url_create_post+'/'+id, datapost, {headers: headers});
    
  }
  
  deletePost(deldata: any): Observable<any> {
    
    console.log(deldata);
	const url = `${this.api_url_create_post}/${deldata}?force=true`;
    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);
    const httpOptions = {
	  headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': `Bearer ${token}`
	  })
	}
	return this.http.delete(url, httpOptions);
  }
  
  getProduct() {
	  let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
		  console.log(token);

		let headers = new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Authorization': `Bearer ${token}`
		});
	  
		return this.http.get(this.api_url_create_product, {headers: headers} );
  }
  
  createProduct(name, content, price, sale_price,image){
    let pimage = {
		id: image.id,
		date_created: image.date,
		date_created_gmt: image.date_gmt,
		date_modified: image.modified,
		date_modified_gmt: image.modified_gmt,
		src: image.guid.rendered,
		name: image.title.rendered,
		alt: image.alt_text,
		position: 0
    };
    let pimages = {
		0 : pimage
    };
    let data = {
      name: name,
      description: content,
      regular_price: price,
      sale_price: sale_price,
      images : pimages,
      status: 'publish'
    };
    console.log(data);

    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.api_url_create_product, data, {headers: headers});
  }
  
  deleteProduct(id:number): Observable<any> {
    
    console.log(id);
	
	
    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);
	const httpOptions = {
	  headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': `Bearer ${token}`
	  })
	}
		let url = this.api_url_create_product + '/' + id +'?force=true';
		  return this.http.delete(url,httpOptions);
     
  }
  
  editProduct(product:any,imageOld:any,imageNew:any, id:number) {
  
  if(imageNew != null) {
  
	let pimage = {
		id: imageNew.id,
		date_created: imageNew.date,
		date_created_gmt: imageNew.date_gmt,
		date_modified: imageNew.modified,
		date_modified_gmt: imageNew.modified_gmt,
		src: imageNew.guid.rendered,
		name: imageNew.title.rendered,
		alt: imageNew.alt_text,
		position: 0
    };
    
	let productimage = {
		0 : pimage
	};
	
	this.imageData= {
      name: product.productname,
      description: product.productdescription,
      regular_price: product.productprice,
      sale_price: product.productsprice,
      images: productimage,
      status: 'publish'
    };

  }
  else {
  
	this.imageData= {
      name: product.productname,
      description: product.productdescription,
      regular_price: product.productprice,
      sale_price: product.productsprice,
      images: imageOld,
      status: 'publish'
    };
	
  }
	
	 
    
    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.api_url_create_product+'/'+id, this.imageData, {headers: headers});
  }

  getOrders(page:number = 1) {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  let url = this.api_url_order + '?per_page=100';
	return this.http.get(url, {headers: headers} );
  }
  
  comfirmOrder(id) {
  
	let data = {
      
      status: 'completed'
    };
    console.log(id);
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    let url = this.api_url_order;
	  return this.http.put( url+'/'+id, data, {headers: headers} );
  }
  
  getOrdersByFilter(filter) {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	});
	let url = this.api_url_order + '?' + filter;
	return this.http.get(url, {headers: headers} );
  }
  
  getMedia(page:number = 1) {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  let url = this.api_url + 'media?per_page=16&page=' + page;
	return this.http.get(url, {headers: headers} );
  }
  
  getMediaByID(id) {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  let url = this.api_url + 'media/' + id;
	return this.http.get(url, {headers: headers} );
  }
  
  getReports() {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  let url = this.api_url_report + '/sales';
	return this.http.get(url, {headers: headers} );
  }
  
  getTopseller() {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  let url = this.api_url_report + '/top_sellers?period=week';
	return this.http.get(url, {headers: headers} );
  }
  
   getTopsellerByFilter(filter) {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  let url = this.api_url_report + '/top_sellers?period=' + filter;
	return this.http.get(url, {headers: headers} );
  }
  
  getUsers() {
	let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
	  console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  let url = this.api_url + 'users';
	return this.http.get(url, {headers: headers} );
  }
  
  createUsers(username, name, email, password, role){
    let data = {
      username: username,
      name: name,
      email: email,
      password: password,
      roles: role,
    };
    console.log(data);

    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.api_url + 'users', data, {headers: headers});
  }
  
}
