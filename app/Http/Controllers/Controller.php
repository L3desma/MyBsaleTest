<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Models\product;
use App\Models\category;

class Controller extends BaseController
{


    //Listar prodcuto en desorden
    public function list_product(Request $request ){
        $data= product::select()->paginate(6);
        return response()->json([
            'message' => $data
        ],200);
    }
    //optener categorias de la DB
    public function get_category(Request $request ){
        $data= category::select()->get();
        return response()->json([
            'message' => $data
        ],200);
    }
    //Ordenar y filtrar producto
    public function order_product_category(Request $request ){
        $request->validate([
            'id_category' => "required|regex:{^[0-9]+$}",
        ]);
        if(is_null($request->filtro) || $request->filtro== 'null'){//validamos filtro
            $data= product::select()
                            ->where([
                                'category' => $request->id_category
                            ])
                            ->paginate(6);

        }else{
            if($request->filtro == 'NAME_ASC'){
                $data= product::select()
                                ->where([
                                    'category' => $request->id_category
                                ])
                                ->orderBy('name','ASC')
                                ->paginate(6);
            }elseif($request->filtro == 'NAME_DESC'){
                $data= product::select()
                                ->where([
                                    'category' => $request->id_category
                                ])
                                ->orderBy('name','DESC')
                                ->paginate(6);
            }elseif($request->filtro == 'PRICE_ASC'){
                $data= product::select()
                                ->where([
                                    'category' => $request->id_category
                                ])
                                ->orderBy('price','ASC')
                                ->paginate(6);
            }elseif($request->filtro == 'PRICE_DESC'){
                $data= product::select()
                                ->where([
                                    'category' => $request->id_category
                                ])
                                ->orderBy('price','DESC')
                                ->paginate(6);
            }
        }
        return response()->json([
            'message' => $data
        ],200);
    }

    //Busqueda
    public function search (Request $request){
        $response = array();

        if(is_null($request->category) || $request->category == 'null'){//verificamos categoria
            switch($request->filtro){//validamos filtro
                case 'NAME':
                    $product = product::select()
                                    ->where('name', 'LIKE', '%'.$request->campo.'%')
                                    ->get();
                                    foreach($product as $product){
                                        $response[] = array(
                                            "id"=>$product->id,
                                            "label"=>$product->name,
                                            'image'=>$product->url_image,
                                            'category'=>$product->category,
                                            'price'=>$product->price,
                                            'discount'=>$product->discount,
                                        );
                                    }
                    break;
                case 'PRICE':
                    $product = product::select()
                                    ->where('price', 'LIKE', '%'.$request->campo.'%')
                                    ->get();
                                    foreach($product as $product){
                                        $response[] = array(
                                            "id"=>$product->id,
                                            "label"=>'$'.$product->price.'  '.$product->name,
                                            'image'=>$product->url_image,
                                            'category'=>$product->category,
                                            'price'=>$product->price,
                                            'discount'=>$product->discount,
                                        );
                                    }
                    break;
            }
            return response()->json([
                'message' => $response
            ]);

        }

        switch($request->filtro){//validamos filtro
            case 'NAME':
                $product = product::select()
                                ->where('name', 'LIKE', '%'.$request->campo.'%')
                                ->where('category','=',$request->category)
                                ->get();
                                foreach($product as $product){
                                    $response[] = array(
                                        "id"=>$product->id,
                                        "label"=>$product->name,
                                        'category'=>$product->category,
                                        'image'=>$product->url_image,
                                        'category_res'=>$request->category,
                                        'price'=>$product->price,
                                        'discount'=>$product->discount,
                                    );
                                }
                break;
            case 'PRICE':
                $product = product::select()
                                ->where('price', 'LIKE', '%'.$request->campo.'%')
                                ->where('category','=',$request->category)
                                ->get();
                                foreach($product as $product){
                                    $response[] = array(
                                        "id"=>$product->id,
                                        "label"=>'$'.$product->price.'  '.$product->name,
                                        'image'=>$product->url_image,
                                        'category'=>$product->category,
                                        'price'=>$product->price,
                                        'discount'=>$product->discount,
                                    );
                                }
                break;
        }
        return response()->json([
            'message' => $response
        ]);
    }
}
