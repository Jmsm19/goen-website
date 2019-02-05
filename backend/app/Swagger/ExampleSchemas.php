<?php

/***********************
 * EXAMPLES
 **********************/

/**
* Obeject Schema, data wrapper
*
* @OA\Schema(
*   schema="DataWrapperExample",
*   @OA\Property(
*       property="data",
*       @OA\Property(
*           property="expiresAt",
*           title="expiresAt",
*           type="string",
*           description="Token expiration date",
*       )
*   )
* )
*/
