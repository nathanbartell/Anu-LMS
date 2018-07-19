<?php

namespace Drupal\anu_comments;

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;
use Drupal\anu_normalizer\AnuNormalizerBase;
use Drupal\Core\Entity\EntityInterface;

/**
 * Helper service for comment entity.
 */
class Comment {

  /**
   * Looking for root parent comment recursively.
   */
  public function getRootComment($comment) {
    if (!empty($comment->field_comment_parent->getValue())) {
      $parent = $comment->field_comment_parent
        ->first()
        ->get('entity')
        ->getValue();

      return $this->getRootComment($parent);
    }

    return $comment;
  }

  /**
   * Push comment entity to the socket. @todo: Move socket part to separate service.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   Comment entity.
   * @param string $action
   *   Action, can be `insert`, `update` or `delete`.
   */
  public function pushEntity(EntityInterface $entity, $action) {

    try {

      // Prepare comment entity to send to frontend.
      $normalizedEntity = AnuNormalizerBase::normalizeEntity($entity, ['lesson', 'uid']);

      if (!$normalizedEntity) {
        throw new \Exception("Entity can't be normalized.");
      }

      // Get websocket URL.
      $websocket = \Drupal::request()->getSchemeAndHttpHost();

      // Prepares websocket config.
      $httpContext = [
        'header' => [
          'Origin: ' . $websocket,
        ],
      ];

      // Initialize client.
      $client = new Client(new Version2X($websocket, [
        'context' => [
          'http' => $httpContext,
        ],
      ]));

      // Send entity to websocket.
      $client->initialize();
      $data = [
        'action' => $action,
        'data' => $normalizedEntity,
      ];
      $client->emit('comment', \Drupal::service('serializer')->normalize($data, 'json'));
      $client->close();
    }
    catch (\Exception $exception) {

      \Drupal::logger('anu_comments')
        ->critical('Could not write entity to socket. Error: @error', [
          '@error' => $exception->getMessage(),
        ]);
    }
  }

}
