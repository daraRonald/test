import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../envrionment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
/*
  Generated class for the QuotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordpressProvider {
  api_url = environment.site_url+environment.data_url;
  api_url_create_post = environment.site_url+environment.posts_url;
  api_url_create_product = environment.site_url+environment.products_url;
  api_url_delete_product = environment.site_url+environment.products_url+'/';

  constructor(public http: HttpClient) {
    console.log('Hello PostsProvider Provider');
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
	
    let data = {
      title: post.pname,
      content: post.pdescription,
     
      status: 'publish'
    };
    console.log(post);

    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.api_url_create_post+'/'+id, data, {headers: headers});
  }
  
  deletePost(deldata: any): Observable<any> {
    
    console.log(deldata);
	
    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);
	let headers=new Headers({
		'Access-Control-Allow-Origin':'*',
		'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
		});
		let url = this.api_url_create_post + '/' + deldata +'?force=true';
		  return this.http.delete(url,{headers: headers});
  }
  
  createProduct(name, content, price, sale_price){
    let data = {
      name: name,
      description: content,
      regular_price: price,
      sale_price: sale_price,
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
  
  deleteProduct(id:number): Observable<any>{
    
    console.log(id);
	
	
    let token = JSON.parse(localStorage.getItem('wpIonicToken')).token;
    console.log(token);
	let headers=new Headers({
		'Access-Control-Allow-Origin':'*',
		'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
		});
		let url = this.api_url_create_product + '/' + id +'?force=true';
		  return this.http.delete(url,{headers: headers});
     
  }

}
