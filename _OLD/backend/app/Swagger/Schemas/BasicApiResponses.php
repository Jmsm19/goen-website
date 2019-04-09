<?php

/**
* @OA\Schema(
*   schema="ErrorResponse",
*   required={"error"},
*   @OA\Property(
*       property="error",
*       title="error",
*       type="string",
*       description="Error message",
*   ),
* )
*/

/**
* @OA\Schema(
*   schema="ResponseMessage",
*   required={"message"},
*   @OA\Property(
*       property="message",
*       title="message",
*       type="string",
*       description="Response message",
*   ),
* )
*/

/**
* @OA\Schema(
*   schema="InvalidData",
*   required={"message"},
*   @OA\Property(
*       property="message",
*       title="message",
*       type="string",
*       description="Response message",
*   ),
*   @OA\Property(
*       property="errors",
*       title="errors",
*       description="Fields with errors",
*       @OA\Property(
*           property="field",
*           title="field",
*           description="Field with error",
*           type="array",
*           @OA\Items(type="string"),
*       )
*   ),
*   example={
*       "message": "The given data was invalid.",
*       "errors": {
*           "image": "['The image must be a file of type: jpeg, bmp, png.']"
*       }
*   }
* )
*/
