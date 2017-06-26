<?php
// Routes

// $app->get('/[{name}]', function ($request, $response, $args) {
//     // Sample log message
//     $this->logger->info("Slim-Skeleton '/' route");

//     // Render index view
//     return $this->renderer->render($response, 'index.phtml', $args);
// });


// // get all foods
// $app->get('/foods', function ($request, $response, $args) {
//     $sth = $this->db->prepare("SELECT * FROM food_description");
//     $sth->execute();
//     $todos = $sth->fetchAll();
//     return $this->response->withJson($todos);
// });


// Retrieve food with name 
$app->get('/food', function ($request, $response, $args) {
        $sth = $this->db->prepare("SELECT amount, gm_wgt, msre_desc
            FROM food_weight 
	        INNER JOIN food_description ON food_weight.long_desc = food_description.long_desc
            WHERE food_weight.long_desc=:name
            ORDER BY  msre_desc");
    $name = $request->getQueryParam('name');
    $sth->bindParam("name", $name);
    $sth->execute();
    $food_info = $sth->fetchAll();
    return $this->response->withJson($food_info);
});

// Search for food with given search tearm in their name
$app->get('/foods/search', function ($request, $response, $args) {
    $sth = $this->db->prepare("SELECT long_desc FROM food_description 
        WHERE UPPER(`long_desc`) LIKE :query ORDER BY `long_desc`
        LIMIT 20");
    $query = $request->getQueryParam('query');
    $query = "%".$query."%";
    $sth->bindParam("query", $query);
    $sth->execute();
    $foods = $sth->fetchAll(PDO::FETCH_COLUMN);
    return $this->response->withJson($foods);
});