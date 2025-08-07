'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Copy, Check, ExternalLink, Webhook, Settings } from 'lucide-react'

export default function WebhookConfigPage() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [externalWebhookUrl, setExternalWebhookUrl] = useState('')
  const [webhookToken, setWebhookToken] = useState('')
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Get current domain for webhook URL
    if (typeof window !== 'undefined') {
      const currentDomain = window.location.origin
      setWebhookUrl(`${currentDomain}/api/webhook/leads`)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const testWebhook = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Teste Webhook',
          email: 'teste@webhook.com',
          phone: '11999999999',
          specialty: 'Cardiologia',
          clinic_name: 'Clínica Teste',
          city: 'São Paulo',
          state: 'SP',
          utm_source: 'webhook_test',
          utm_medium: 'admin_panel',
          utm_campaign: 'webhook_configuration',
        }),
      })

      const result = await response.json()
      setTestResult({
        success: response.ok,
        data: result,
        status: response.status,
      })
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testWebhookEndpoint = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/webhook/leads')
      const result = await response.json()
      setTestResult({
        success: response.ok,
        data: result,
        status: response.status,
        type: 'endpoint_test'
      })
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        type: 'endpoint_test'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Webhook className="h-8 w-8" />
            Configuração de Webhooks
          </h1>
          <p className="text-gray-600 mt-2">
            Configure e teste os webhooks para receber notificações de novos leads
          </p>
        </div>

        <div className="grid gap-6">
          {/* Internal Webhook Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Webhook Interno
              </CardTitle>
              <CardDescription>
                Endpoint interno para processar notificações de leads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="internal-webhook">URL do Webhook Interno</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="internal-webhook"
                    value={webhookUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(webhookUrl)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Para configurar no Vercel:</strong>
                  <br />
                  1. Vá em Settings → Environment Variables
                  <br />
                  2. Adicione: <code className="bg-gray-100 px-1 rounded">LEAD_WEBHOOK_URL</code> = <code className="bg-gray-100 px-1 rounded">{webhookUrl}</code>
                  <br />
                  3. Faça redeploy do projeto
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button onClick={testWebhookEndpoint} disabled={isLoading}>
                  Testar Endpoint
                </Button>
                <Button onClick={testWebhook} disabled={isLoading}>
                  Testar Lead Completo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* External Webhook Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Webhook Externo (Opcional)
              </CardTitle>
              <CardDescription>
                Configure um webhook externo para integrar com outros serviços
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="external-webhook">URL do Webhook Externo</Label>
                <Input
                  id="external-webhook"
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  value={externalWebhookUrl}
                  onChange={(e) => setExternalWebhookUrl(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div>
                <Label htmlFor="webhook-token">Token de Autorização (Opcional)</Label>
                <Input
                  id="webhook-token"
                  type="password"
                  placeholder="Bearer token para autenticação"
                  value={webhookToken}
                  onChange={(e) => setWebhookToken(e.target.value)}
                />
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Variáveis de ambiente para webhook externo:</strong>
                  <br />
                  • <code className="bg-gray-100 px-1 rounded">EXTERNAL_WEBHOOK_URL</code> = URL do seu webhook externo
                  <br />
                  • <code className="bg-gray-100 px-1 rounded">EXTERNAL_WEBHOOK_TOKEN</code> = Token de autorização (opcional)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Popular Webhook Services */}
          <Card>
            <CardHeader>
              <CardTitle>Serviços de Webhook Populares</CardTitle>
              <CardDescription>
                Exemplos de URLs para serviços populares
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Badge variant="outline">Zapier</Badge>
                  <p className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID
                    </code>
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">Make (Integromat)</Badge>
                  <p className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      https://hook.eu1.make.com/YOUR_HOOK_ID
                    </code>
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">Slack</Badge>
                  <p className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
                    </code>
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">Discord</Badge>
                  <p className="text-sm text-gray-600">
                    <code className="bg-gray-100 px-1 rounded text-xs">
                      https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/TOKEN
                    </code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          {testResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {testResult.success ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <ExternalLink className="h-5 w-5 text-red-500" />
                  )}
                  Resultado do Teste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={testResult.success ? "default" : "destructive"}>
                      {testResult.success ? "Sucesso" : "Erro"}
                    </Badge>
                    {testResult.status && (
                      <Badge variant="outline">Status: {testResult.status}</Badge>
                    )}
                  </div>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
