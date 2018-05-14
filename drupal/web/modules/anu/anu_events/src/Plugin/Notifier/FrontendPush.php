<?php

namespace Drupal\anu_events\Plugin\Notifier;

/**
 * Frontend Push notifier.
 *
 * @Notifier(
 *   id = "frontend_push",
 *   title = @Translation("Frontend push"),
 *   description = @Translation("Send push notification to the frontend"),
 * )
 */
class FrontendPush extends MessageNotifierBase {

  /**
   * {@inheritdoc}
   */
  public function deliver(array $output = []) {

    // Put here logic to send notifications to the frontend.
    \Drupal::logger('anu_events')
      ->notice($output['message']->getText()[0] . ' (Notification has been sent to the frontend)');
    return TRUE;
  }

}
