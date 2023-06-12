<?php

namespace App\Support\Enums;

enum HTTPStatus: int
{
    case OK = 200;
    case CREATED = 201;
    case NO_CONTENT = 204;
    case BAD_REQUEST = 400;
    case NOT_FOUND = 404;
    case UNPROCESSABLE_ENTITY = 422;
}
